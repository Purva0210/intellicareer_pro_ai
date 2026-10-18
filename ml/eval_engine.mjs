// Evaluate the REAL JavaScript NLP engine (the one the web app uses) on the labeled dataset.
// usage: node ml/eval_engine.mjs [path/to/nlpEngine.js] [dataset.json]
import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const enginePath = path.resolve(process.argv[2] || 'src/services/nlpEngine.js');
const dataPath = path.resolve(process.argv[3] || 'backend/dataset/resumes_synthetic_150.json');
const out = path.join('/tmp', `engine_${Date.now()}.mjs`);
await build({ entryPoints: [enginePath], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'silent', loader: { '.json': 'json' } });
const eng = await import(pathToFileURL(out).href);
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const ROLES = [...new Set(data.map((d) => d.target_role))].sort();

function evalSubset(rows) {
  let tp = 0, fp = 0, fn = 0;
  const c = { email: [0, 0, 0], phone: [0, 0, 0], linkedin: [0, 0, 0], github: [0, 0, 0] };
  let top1 = 0, top3 = 0;
  const conf = Object.fromEntries(ROLES.map((r) => [r, Object.fromEntries(ROLES.map((x) => [x, 0]))]));
  for (const d of rows) {
    const q = eng.evaluateResumeQuality(d.text);
    const pred = new Set(q.detectedSkills), gold = new Set(d.skills);
    for (const s of pred) gold.has(s) ? tp++ : fp++;
    for (const s of gold) if (!pred.has(s)) fn++;
    for (const k of Object.keys(c)) {
      const p = !!q.contact?.[k], g = !!d.contact[k];
      if (p && g) c[k][0]++; else if (p && !g) c[k][1]++; else if (!p && g) c[k][2]++;
    }
    const rank = eng.classifyTopRoles(d.text).allRolesRanking.map((r) => r.roleId);
    if (rank[0] === d.target_role) top1++;
    if (rank.slice(0, 3).includes(d.target_role)) top3++;
    conf[d.target_role][rank[0]]++;
  }
  const P = tp / Math.max(1, tp + fp), R = tp / Math.max(1, tp + fn), F = (2 * P * R) / Math.max(1e-9, P + R);
  const f1s = ROLES.map((r) => {
    const t = conf[r][r], fpR = ROLES.reduce((a, x) => a + (x !== r ? conf[x][r] : 0), 0), fnR = ROLES.reduce((a, x) => a + (x !== r ? conf[r][x] : 0), 0);
    return (2 * t) / Math.max(1, 2 * t + fpR + fnR);
  });
  const cf = (a) => { const p = a[0] / Math.max(1, a[0] + a[1]), r = a[0] / Math.max(1, a[0] + a[2]); return `${(100 * (2 * p * r) / Math.max(1e-9, p + r)).toFixed(0)}`; };
  return {
    n: rows.length,
    skill_precision: +(100 * P).toFixed(1), skill_recall: +(100 * R).toFixed(1), skill_f1: +(100 * F).toFixed(1),
    contact_f1: Object.fromEntries(Object.entries(c).map(([k, v]) => [k, +cf(v)])),
    role_top1: +(100 * top1 / rows.length).toFixed(1), role_top3: +(100 * top3 / rows.length).toFixed(1),
    role_macro_f1: +(100 * f1s.reduce((a, b) => a + b, 0) / ROLES.length).toFixed(1)
  };
}
const label = process.argv[5] || path.relative(process.cwd(), enginePath);
console.log(`\n=== ${label} ===`);
console.log('ALL 150          ', JSON.stringify(evalSubset(data)));
console.log('Layout D (unseen)', JSON.stringify(evalSubset(data.filter((d) => d.style === 'D'))));
fs.unlinkSync(out);

// Dumps the rule-based (skill coverage + TF cosine) fit score per role for every resume.
import { build } from 'esbuild'; import fs from 'fs'; import { pathToFileURL } from 'url';
await build({ entryPoints: ['src/services/nlpEngine.js'], bundle: true, format: 'esm', platform: 'node', outfile: '/tmp/e_rule.mjs', logLevel: 'silent' });
const eng = await import(pathToFileURL('/tmp/e_rule.mjs').href);
const roles = JSON.parse(fs.readFileSync('ml/roles_dump.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('backend/dataset/resumes_synthetic_150.json', 'utf8'));
const out = {};
for (const d of data) out[d.id] = Object.fromEntries(Object.keys(roles).map((r) => [r, eng.analyzeRoleMatch(d.text, r).roleFitPercentage / 100]));
fs.writeFileSync('ml/rule_scores.json', JSON.stringify(out));
console.log('rule scores for', data.length, 'resumes');

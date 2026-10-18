import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outputPath = path.join(rootDir, 'intellicareer_pro_ai.zip');

console.log('Creating standalone ZIP archive:', outputPath);

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function() {
  console.log(`[SUCCESS] ZIP created successfully! Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Ignore node_modules, .git, and existing zip
archive.glob('**/*', {
  cwd: rootDir,
  ignore: ['node_modules/**', '.git/**', 'intellicareer_pro_ai.zip', 'dist/**']
});

archive.finalize();

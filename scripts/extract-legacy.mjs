import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function extractStyle(htmlPath, outCssPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const match = html.match(/<style>([\s\S]*?)<\/style>/);
  if (!match) throw new Error(`No <style> in ${htmlPath}`);
  fs.mkdirSync(path.dirname(outCssPath), { recursive: true });
  fs.writeFileSync(outCssPath, match[1].trim() + '\n');
  console.log('CSS:', outCssPath);
}

function extractScript(htmlPath, outJsPath) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1].trim());
  if (!inline.length) throw new Error(`No inline <script> in ${htmlPath}`);
  const body = inline.join('\n\n');
  const wrapped = `${body}\n`;
  fs.mkdirSync(path.dirname(outJsPath), { recursive: true });
  fs.writeFileSync(outJsPath, wrapped);
  console.log('JS:', outJsPath);
}

extractStyle(path.join(root, 'legacy/index.source.html'), path.join(root, 'src/styles/home.css'));
extractScript(path.join(root, 'legacy/index.source.html'), path.join(root, 'src/utils/materialLibraryApp.js'));

extractStyle(path.join(root, 'legacy/material.source.html'), path.join(root, 'src/styles/material.css'));
extractScript(path.join(root, 'legacy/material.source.html'), path.join(root, 'src/utils/materialPageApp.js'));

extractStyle(path.join(root, 'legacy/admin.source.html'), path.join(root, 'src/styles/admin.css'));
extractScript(path.join(root, 'legacy/admin.source.html'), path.join(root, 'src/utils/adminApp.js'));

extractStyle(path.join(root, 'legacy/cms-viewer.source.html'), path.join(root, 'src/styles/cms-viewer.css'));
// cms-viewer has inline script at bottom - extract it
{
  const html = fs.readFileSync(path.join(root, 'legacy/cms-viewer.source.html'), 'utf8');
  const inline = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1].trim());
  fs.writeFileSync(path.join(root, 'src/utils/cmsViewerApp.js'), inline.join('\n\n') + '\n');
  console.log('JS:', path.join(root, 'src/utils/cmsViewerApp.js'));
}

// Copy cms-renderer to utils
fs.copyFileSync(path.join(root, 'cms-renderer.js'), path.join(root, 'src/utils/cms-renderer.js'));
console.log('Copied cms-renderer.js');

// Move categories.json to public if not there
const pubCat = path.join(root, 'public/categories.json');
if (!fs.existsSync(pubCat)) {
  fs.mkdirSync(path.join(root, 'public'), { recursive: true });
  fs.copyFileSync(path.join(root, 'categories.json'), pubCat);
}

console.log('Extraction complete.');

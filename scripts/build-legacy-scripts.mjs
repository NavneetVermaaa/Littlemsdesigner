import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const legacyDir = path.join(root, 'public/legacy');

fs.mkdirSync(legacyDir, { recursive: true });

function copyLegacy(name) {
  const src = path.join(root, `src/utils/${name}`);
  const dest = path.join(legacyDir, name);
  let content = fs.readFileSync(src, 'utf8');
  // Remove ES module exports if present
  content = content.replace(/\nexport async function initMaterialLibrary[\s\S]*$/m, '');
  fs.writeFileSync(dest, content);
  console.log('Legacy:', dest);
}

// Patch material library: remove DOMContentLoaded, add init hook
{
  let content = fs.readFileSync(path.join(root, 'src/utils/materialLibraryApp.js'), 'utf8');
  content = content.replace(/\nexport async function initMaterialLibrary[\s\S]*$/m, '');
  content = content.replace(
    /\s*window\.addEventListener\(\s*["']DOMContentLoaded["'],\s*loadCategories\s*\);\s*/,
    '\n'
  );
  content = content.replace(
    /\s*\/\/ Count-up animation for stats\r?\n\s*const counters = document\.querySelectorAll\('\.count-up'\);/,
    `\n    function runCounterAnimation() {
    const counters = document.querySelectorAll('.count-up');`
  );
  content = content.replace(
    /(\s*setTimeout\(animateCounters, 800\);\r?\n\s*\})\r?\n\r?\n(\s*\/\* =+)/,
    `$1
}

$2`
  );
  content += `
window.initMaterialLibrary = function() {
  loadCategories();
  if (typeof runCounterAnimation === 'function') runCounterAnimation();
};
`;
  fs.writeFileSync(path.join(legacyDir, 'materialLibraryApp.js'), content);
  console.log('Legacy: materialLibraryApp.js');
}

copyLegacy('materialPageApp.js');
{
  let content = fs.readFileSync(path.join(root, 'src/utils/materialPageApp.js'), 'utf8');
  if (!content.includes('toggleTheme')) {
    content += `
function toggleTheme() {
  document.documentElement.classList.toggle('dark-mode');
  var btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = document.documentElement.classList.contains('dark-mode') ? '☀️' : '🌙';
}
`;
  }
  fs.writeFileSync(path.join(legacyDir, 'materialPageApp.js'), content);
}

copyLegacy('adminApp.js');
{
  let content = fs.readFileSync(path.join(legacyDir, 'adminApp.js'), 'utf8');
  content += `
window.initAdmin = function() {
  renderTemplateForm();
};
`;
  fs.writeFileSync(path.join(legacyDir, 'adminApp.js'), content);
}

// cms-renderer + cms viewer
fs.copyFileSync(path.join(root, 'src/utils/cms-renderer.js'), path.join(legacyDir, 'cms-renderer.js'));
{
  let content = fs.readFileSync(path.join(root, 'src/utils/cmsViewerApp.js'), 'utf8');
  content = content.replace(/document\.addEventListener\('DOMContentLoaded',\s*init\);?/, '');
  content += `\nwindow.initCmsViewer = init;\n`;
  fs.writeFileSync(path.join(legacyDir, 'cmsViewerApp.js'), content);
}

console.log('Legacy scripts ready in public/legacy/');

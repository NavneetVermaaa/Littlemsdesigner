import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.join(__dirname, '../src/utils/materialLibraryApp.js');

let src = fs.readFileSync(appPath, 'utf8');

// Remove DOMContentLoaded listener for loadCategories
src = src.replace(
  /\s*window\.addEventListener\(\s*["']DOMContentLoaded["'],\s*loadCategories\s*\);\s*/,
  '\n'
);

// Wrap counter animation in a named function
src = src.replace(
  /\/\/ Count-up animation for stats\n\s*const counters = document\.querySelectorAll\('\.count-up'\);/,
  `function runCounterAnimation() {
    const counters = document.querySelectorAll('.count-up');`
);

// Close the runCounterAnimation function before furniture section
src = src.replace(
  /(\s*\/\/ Run animation after a short delay for better visual effect\n\s*setTimeout\(animateCounters, 800\);\n\s*\})\n\n(\s*\/\* =+)/,
  `$1
}

$2`
);

const bootstrap = `
export async function initMaterialLibrary() {
  await loadCategories();
  runCounterAnimation();
}

const _globals = {
  filterCats,
  goHome,
  handleSearch,
  openCat,
  lbOpen,
  lbClose,
  colorComboZoomOpen,
  colorComboZoomClose,
  furnitureFigmaZoom,
  furnitureFigmaZoomClose,
  kitchenFigmaZoom,
  kitchenFigmaZoomClose,
  furnitureOpenZoom,
  furnitureCloseZoom,
  kitchenOpenZoom,
  kitchenCloseZoom,
  expNewZoom,
  top10Zoom,
  openDynamicCard,
  openComingSoon,
  specZoom,
};

Object.assign(window, _globals);
`;

fs.writeFileSync(appPath, src.trimEnd() + '\n' + bootstrap);
console.log('Patched materialLibraryApp.js');

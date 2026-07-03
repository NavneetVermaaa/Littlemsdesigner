import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function extractBody(htmlPath, stripScripts = true) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!match) throw new Error(`No body in ${htmlPath}`);
  let body = match[1].trim();
  if (stripScripts) body = body.replace(/<script[\s\S]*?<\/script>/gi, '').trim();
  return body;
}

function toJsxFromHtml(html, componentName) {
  const escaped = html
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  return `export default function ${componentName}() {
  return (
    <div dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />
  );
}
`;
}

fs.writeFileSync(
  path.join(root, 'src/components/MaterialPageContent.jsx'),
  toJsxFromHtml(extractBody(path.join(root, 'legacy/material.source.html')), 'MaterialPageContent')
);

fs.writeFileSync(
  path.join(root, 'src/components/AdminPageContent.jsx'),
  toJsxFromHtml(extractBody(path.join(root, 'legacy/admin.source.html')), 'AdminPageContent')
);

fs.writeFileSync(
  path.join(root, 'src/components/CmsViewerPageContent.jsx'),
  toJsxFromHtml(extractBody(path.join(root, 'legacy/cms-viewer.source.html')), 'CmsViewerPageContent')
);

console.log('Generated page content components');

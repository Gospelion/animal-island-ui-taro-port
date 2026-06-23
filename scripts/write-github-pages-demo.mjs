import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'examples', 'taro-demo', 'dist');
const defaultBase = '/animal-island-ui-taro-port/';
const publicPath = process.env.TARO_PUBLIC_PATH || defaultBase;
const normalizedBase = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;

if (!existsSync(distDir)) {
  throw new Error(`Taro H5 dist directory does not exist: ${distDir}`);
}

const listFiles = (dir, extension) => {
  const fullDir = join(distDir, dir);
  if (!existsSync(fullDir)) return [];
  return readdirSync(fullDir)
    .filter((file) => file.endsWith(extension))
    .sort()
    .map((file) => `${dir}/${file}`);
};

const cssFiles = listFiles('css', '.css');
const jsFiles = listFiles('js', '.js').sort((left, right) => {
  if (left.endsWith('/app.js')) return 1;
  if (right.endsWith('/app.js')) return -1;
  return left.localeCompare(right);
});

if (!jsFiles.some((file) => file.endsWith('/app.js'))) {
  throw new Error('Taro H5 dist is missing js/app.js');
}

const assetUrl = (file) => `${normalizedBase}${file}`;

const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Animal Island UI Taro Demo</title>
${cssFiles.map((file) => `    <link rel="stylesheet" href="${assetUrl(file)}" />`).join('\n')}
  </head>
  <body>
    <div id="app"></div>
${jsFiles.map((file) => `    <script defer src="${assetUrl(file)}"></script>`).join('\n')}
  </body>
</html>
`;

writeFileSync(join(distDir, 'index.html'), html);
console.log('Wrote GitHub Pages entry to examples/taro-demo/dist/index.html');

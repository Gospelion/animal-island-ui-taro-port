import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const from = join(root, 'src', 'components', 'styles.css');
const toDir = join(root, 'dist', 'components');
mkdirSync(toDir, { recursive: true });
writeFileSync(join(toDir, 'styles.css'), readFileSync(from, 'utf8'));
cpSync(join(root, 'src', 'assets'), join(root, 'dist', 'assets'), { recursive: true, force: true });

console.log('Copied Taro component CSS assets.');

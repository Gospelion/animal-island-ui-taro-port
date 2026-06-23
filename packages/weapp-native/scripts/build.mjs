import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const dist = resolve(root, 'dist');

mkdirSync(dist, { recursive: true });
cpSync(join(root, 'components'), join(dist, 'components'), { recursive: true, force: true });
cpSync(join(root, 'styles'), join(dist, 'styles'), { recursive: true, force: true });
writeFileSync(join(dist, 'README.md'), readFileSync(join(root, 'README.md'), 'utf8'));
writeFileSync(join(dist, 'package.json'), readFileSync(join(root, 'package.json'), 'utf8'));

console.log('Built native WeChat package to packages/weapp-native/dist.');

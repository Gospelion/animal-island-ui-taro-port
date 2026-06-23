import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const componentRoot = join(root, 'packages', 'weapp-native', 'components');
const components = [
  'ai-button',
  'ai-card',
  'ai-icon',
  'ai-input',
  'ai-modal',
  'ai-switch',
  'ai-checkbox',
  'ai-radio',
  'ai-title',
  'ai-divider',
  'ai-collapse'
];
const required = ['index.wxml', 'index.wxss', 'index.js', 'index.json'];

const missing = [];
for (const component of components) {
  for (const file of required) {
    const full = join(componentRoot, component, file);
    if (!existsSync(full)) missing.push(full);
  }
}

const packageJson = join(root, 'packages', 'weapp-native', 'package.json');
if (!existsSync(packageJson)) missing.push(packageJson);

if (missing.length > 0) {
  console.error('Missing native WeChat component files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

console.log('Native WeChat component structure OK.');

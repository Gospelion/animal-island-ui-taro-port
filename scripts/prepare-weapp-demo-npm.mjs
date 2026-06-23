import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const source = join(root, 'packages', 'weapp-native', 'dist');
const targets = [
  join(root, 'examples', 'weapp-demo', 'node_modules', '@animal-island-ui', 'weapp'),
  join(root, 'examples', 'weapp-demo', 'miniprogram_npm', '@animal-island-ui', 'weapp')
];

if (!existsSync(source)) {
  throw new Error('Missing packages/weapp-native/dist. Run npm run build:weapp-native first.');
}

for (const target of targets) {
  try {
    rmSync(target, { recursive: true, force: true });
    mkdirSync(target, { recursive: true });
    cpSync(source, target, { recursive: true, force: true });
  } catch (error) {
    if (error?.code === 'EPERM') {
      throw new Error(
        `Cannot update ${target}. Close WeChat DevTools or stop its compiler, then run npm run prepare:weapp-demo again.`
      );
    }
    throw error;
  }
}

console.log('Prepared examples/weapp-demo node_modules and miniprogram_npm for @animal-island-ui/weapp.');

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const scanRoots = [
  join(root, 'packages', 'taro-ui', 'src'),
  join(root, 'examples', 'taro-demo', 'src')
];

const cssFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (entry.endsWith('.css')) {
      cssFiles.push(full);
    }
  }
}

for (const dir of scanRoots) walk(dir);

const violations = [];
const lowercasePxPattern = /(?<![a-zA-Z])-?(?:\d|\.)[\d.]*px\b/g;

for (const file of cssFiles) {
  const source = readFileSync(file, 'utf8');
  const lines = source.split(/\r?\n/);
  lines.forEach((line, index) => {
    const matches = line.match(lowercasePxPattern);
    if (!matches) return;
    violations.push({
      file,
      line: index + 1,
      values: matches
    });
  });
}

if (violations.length > 0) {
  console.error('Lowercase px is not allowed in Taro CSS sources.');
  console.error('Use rpx for scalable Taro units, or uppercase PX for real CSS pixels that must not be transformed.');
  for (const violation of violations) {
    console.error(`- ${violation.file}:${violation.line} (${violation.values.join(', ')})`);
  }
  process.exit(1);
}

console.log('Taro CSS unit check OK.');

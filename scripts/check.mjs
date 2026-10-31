import { readdir, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { escapeHTML, safeHref, formatDate } from '../src/utils/dom.js';

const root = fileURLToPath(new URL('../', import.meta.url));
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
const files = (await walk(root)).filter(file => /\.(js|mjs)$/.test(file));
for (const file of files) {
  execFileSync(process.execPath, ['--check', file]);
  const code = await readFile(file, 'utf8');
  for (const match of code.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g)) {
    if (match[1].startsWith('.')) await access(path.resolve(path.dirname(file), match[1]));
  }
}
// 외부 데이터의 스크립트 삽입과 잘못된 주소를 방지하는 경계를 확인합니다.
assert.equal(escapeHTML('<img onerror="x">'), '&lt;img onerror=&quot;x&quot;&gt;');
assert.equal(safeHref('javascript:alert(1)'), '#');
assert.equal(safeHref('data:text/html,abc'), '#');
assert.equal(safeHref('java\nscript:alert(1)'), '#');
assert.equal(safeHref('./design.md'), './design.md');
assert.equal(formatDate('2026-10-31'), '2026. 10. 31.');
console.log(`자바스크립트 ${files.length}개 구문, 상대 모듈 경로, 콘텐츠 안전 처리 확인 완료`);

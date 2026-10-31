import './components/index.js';
import { exampleWorks } from './data/exampleWorks.js';

const grid = document.querySelector('#portfolio-grid');
grid.works = exampleWorks;

// 예시 작업물은 실제 상세 페이지 대신 명확하게 표시된 미리보기를 엽니다.
const dialog = document.querySelector('#work-preview');
document.addEventListener('click', event => {
  const lessonLink = event.target.closest('[data-select-lessons]');
  if (lessonLink) grid.filter = 'lesson';
  const link = event.target.closest('a[href^="#example-"]');
  if (!link) return;
  const work = exampleWorks.find(item => link.getAttribute('href') === item.href);
  if (!work) return;
  event.preventDefault();
  dialog.querySelector('h2').textContent = work.title;
  dialog.querySelector('.preview-description').textContent = work.summary;
  dialog.querySelector('pf-work-chart').setAttribute('kind', work.chart);
  dialog.showModal();
});
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());

// 내려받기 예제는 현재 프로젝트에 실제 존재하는 문서를 사용합니다.
const files = await Promise.all([
  { name: '디자인 가이드', href: './design.md', usage: '웹사이트 제작 기준을 설명하는 프로젝트 문서입니다.' },
  { name: '기획 요구사항', href: './prd.md', usage: '화면 구성과 기능 범위를 설명하는 프로젝트 문서입니다.' }
].map(async file => {
  const response = await fetch(file.href);
  if (!response.ok) throw new Error(`${file.name} 파일을 찾을 수 없습니다.`);
  const bytes = (await response.arrayBuffer()).byteLength;
  return { ...file, format: 'Markdown', sizeLabel: `${(bytes / 1024).toFixed(1)} KB` };
})).catch(() => []);
document.querySelector('#document-downloads').files = files;
if (!files.length) document.querySelector('#download-error').hidden = false;

// 현재 화면 위치에 맞춰 메뉴 활성 표시를 갱신합니다.
function updateNavigation() {
  const aboutTop = document.querySelector('#about').getBoundingClientRect().top;
  const worksTop = document.querySelector('#works').getBoundingClientRect().top;
  const active = worksTop <= 140 ? '#works' : aboutTop <= 140 ? '#about' : './';
  document.querySelectorAll('.site-header nav a').forEach(link => {
    if (link.getAttribute('href') === active) link.setAttribute('aria-current', active === './' ? 'page' : 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

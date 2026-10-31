import { defineElement } from '../utils/dom.js';
import './FilterGroup.js';
import './WorkCard.js';
import './EmptyState.js';

export class WorkGrid extends HTMLElement {
  #works = [];
  #value = 'all';
  set works(value) { this.#works = Array.isArray(value) ? value : []; if (this.isConnected) this.update(); }
  get works() { return this.#works; }
  set filter(value) {
    this.#value = ['all', 'project', 'lesson'].includes(value) ? value : 'all';
    if (this.isConnected) { this.querySelector('pf-filter-group').value = this.#value; this.update(); }
  }
  get filter() { return this.#value; }
  connectedCallback() {
    this.innerHTML = '<div class="work-toolbar"><pf-filter-group></pf-filter-group><p class="muted" role="status" aria-live="polite" aria-atomic="true"></p></div><div class="work-grid"></div>';
    this.querySelector('pf-filter-group').value = this.#value;
    this.addEventListener('filter-change', this.#handleFilter);
    this.update();
  }
  disconnectedCallback() { this.removeEventListener('filter-change', this.#handleFilter); }
  #handleFilter = event => { this.#value = event.detail.value; this.update(); };
  update() {
    // 초안은 공개 목록에서 제외하며 날짜가 같으면 제목으로 정렬합니다.
    const published = this.#works.filter(work => work.draft === false).sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || '') || a.title.localeCompare(b.title, 'ko'));
    const visible = published.filter(work => this.#value === 'all' || work.type === this.#value);
    const grid = this.querySelector('.work-grid');
    this.querySelector('[role="status"]').textContent = `${this.#value === 'all' ? '전체' : this.#value === 'project' ? '프로젝트' : '수업 자료'} ${visible.length}개`;
    grid.replaceChildren();
    if (!visible.length) {
      const empty = document.createElement('pf-empty-state');
      if (!published.length) { empty.setAttribute('heading', '작업물을 준비하고 있습니다.'); empty.setAttribute('description', '공개되는 프로젝트와 수업 자료를 이곳에서 확인할 수 있습니다.'); }
      else { empty.setAttribute('action-label', '전체 보기'); empty.addEventListener('click', event => { if (event.target.closest('button')) this.filter = 'all'; }); }
      grid.append(empty);
      return;
    }
    visible.forEach(work => { const card = document.createElement('pf-work-card'); card.work = work; grid.append(card); });
  }
}
defineElement('pf-work-grid', WorkGrid);

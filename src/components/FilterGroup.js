import { defineElement } from '../utils/dom.js';

export class FilterGroup extends HTMLElement {
  #value = 'all';
  set value(value) {
    this.#value = ['all', 'project', 'lesson'].includes(value) ? value : 'all';
    this.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.value === this.#value)));
  }
  get value() { return this.#value; }
  connectedCallback() {
    this.innerHTML = `<div class="filter-group" role="group" aria-label="작업물 종류">${[['all', '전체'], ['project', '프로젝트'], ['lesson', '수업 자료']].map(([value, label]) => `<button type="button" class="filter-button" data-value="${value}" aria-pressed="${this.#value === value}">${label}</button>`).join('')}</div>`;
    this.onclick = event => {
      const button = event.target.closest('button[data-value]');
      if (!button) return;
      this.value = button.dataset.value;
      this.dispatchEvent(new CustomEvent('filter-change', { detail: { value: this.value }, bubbles: true }));
    };
  }
}
defineElement('pf-filter-group', FilterGroup);

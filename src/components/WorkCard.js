import { defineElement, escapeHTML, safeHref, formatDate } from '../utils/dom.js';
import './Badge.js';
import './WorkChart.js';

export class WorkCard extends HTMLElement {
  #work;
  set work(value) { this.#work = value; if (this.isConnected) this.render(); }
  get work() { return this.#work; }
  connectedCallback() { this.render(); }
  render() {
    const work = this.#work;
    if (!work) { this.replaceChildren(); return; }
    const lesson = work.type === 'lesson';
    this.innerHTML = `<article class="work-card">${work.chart ? `<pf-work-chart kind="${escapeHTML(work.chart)}"></pf-work-chart>` : ''}<div class="work-card__content"><pf-badge tone="${lesson ? 'lesson' : 'project'}" label="${lesson ? '수업 자료' : '프로젝트'}"></pf-badge><h3><a class="work-card__link" href="${escapeHTML(safeHref(work.href))}">${escapeHTML(work.title)}<span class="work-card__cta" aria-hidden="true">${lesson ? '학습 자료 살펴보기' : '탐구 과정 보기'} →</span></a></h3><p>${escapeHTML(work.summary)}</p><div class="tag-list">${(work.mathTopics || []).map(tag => `<pf-badge label="${escapeHTML(tag)}"></pf-badge>`).join('')}</div><div class="work-card__meta"><span>${escapeHTML(work.level)}</span>${work.publishedAt ? `<time datetime="${escapeHTML(work.publishedAt)}">${escapeHTML(formatDate(work.publishedAt))}</time>` : ''}${work.example ? '<span>화면 구성용 예시 자료</span>' : ''}</div></div></article>`;
  }
}
defineElement('pf-work-card', WorkCard);

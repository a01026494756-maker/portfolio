import { defineElement, escapeHTML, safeHref } from '../utils/dom.js';
import './Button.js';

export class EmptyState extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div class="empty-state"><span class="empty-state__icon" aria-hidden="true">↗</span><h3>${escapeHTML(this.getAttribute('heading') || '아직 등록된 자료가 없습니다.')}</h3><p>${escapeHTML(this.getAttribute('description') || '다른 분류의 작업물을 확인해 보세요.')}</p>${this.hasAttribute('action-label') ? `<pf-button variant="secondary" size="small" label="${escapeHTML(this.getAttribute('action-label'))}" ${this.hasAttribute('action-href') ? `href="${escapeHTML(safeHref(this.getAttribute('action-href')))}"` : ''}></pf-button>` : ''}</div>`;
  }
}
defineElement('pf-empty-state', EmptyState);

import { defineElement, escapeHTML } from '../utils/dom.js';

export class NoticeBox extends HTMLElement {
  connectedCallback() {
    const tone = ['info', 'warning', 'error'].includes(this.getAttribute('tone')) ? this.getAttribute('tone') : 'info';
    this.innerHTML = `<aside class="notice notice--${tone}"><h3>${escapeHTML(this.getAttribute('heading') || '안내')}</h3><p>${escapeHTML(this.getAttribute('description'))}</p></aside>`;
  }
}
defineElement('pf-notice', NoticeBox);

import { defineElement, escapeHTML, safeHref } from '../utils/dom.js';

export class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer class="site-footer"><div class="container site-footer__inner"><p>${escapeHTML(this.getAttribute('brand') || '수학과 기후환경')}</p><a href="${escapeHTML(safeHref(this.getAttribute('usage-href') || '#usage'))}">자료 이용 안내</a></div></footer>`;
  }
}
defineElement('pf-site-footer', SiteFooter);

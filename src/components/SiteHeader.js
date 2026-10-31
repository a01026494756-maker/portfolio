import { defineElement, escapeHTML, safeHref } from '../utils/dom.js';

export class SiteHeader extends HTMLElement {
  connectedCallback() {
    const current = this.getAttribute('current') || 'home';
    const items = [{ key: 'home', label: '홈', href: './' }, { key: 'about', label: '자기소개', href: '#about' }, { key: 'works', label: '작업물', href: '#works' }];
    const links = items.map(item => `<a href="${escapeHTML(safeHref(this.getAttribute(`${item.key}-href`) || item.href))}" ${current === item.key ? `aria-current="${item.key === 'home' ? 'page' : 'location'}"` : ''}>${item.label}</a>`).join('');
    this.innerHTML = `<header class="site-header"><div class="container site-header__inner"><a class="site-brand" href="${escapeHTML(safeHref(this.getAttribute('home-href') || './'))}">${escapeHTML(this.getAttribute('brand') || '수학과 기후환경')}</a><nav aria-label="주 메뉴">${links}</nav></div></header>`;
  }
}
defineElement('pf-site-header', SiteHeader);

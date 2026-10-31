import { defineElement, escapeHTML, safeHref } from '../utils/dom.js';

export class PortfolioButton extends HTMLElement {
  static observedAttributes = ['label', 'href', 'variant', 'size', 'disabled', 'download'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const label = escapeHTML(this.getAttribute('label') || '버튼');
    const variant = ['primary', 'secondary'].includes(this.getAttribute('variant')) ? this.getAttribute('variant') : 'primary';
    const size = this.getAttribute('size') === 'small' ? 'small' : 'default';
    const disabled = this.hasAttribute('disabled');
    const classes = `button button--${variant} button--${size}`;
    // 이동은 링크, 화면 내부 동작은 실제 버튼을 사용합니다.
    this.innerHTML = this.hasAttribute('href') && !disabled
      ? `<a class="${classes}" href="${escapeHTML(safeHref(this.getAttribute('href')))}" ${this.hasAttribute('download') ? 'download' : ''}>${label}</a>`
      : `<button class="${classes}" type="button" ${disabled ? 'disabled' : ''}>${label}</button>`;
  }
}
defineElement('pf-button', PortfolioButton);

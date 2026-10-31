import { defineElement, escapeHTML } from '../utils/dom.js';

export class PortfolioBadge extends HTMLElement {
  static observedAttributes = ['label', 'tone'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const tone = ['project', 'lesson', 'neutral'].includes(this.getAttribute('tone')) ? this.getAttribute('tone') : 'neutral';
    this.innerHTML = `<span class="badge badge--${tone}">${escapeHTML(this.getAttribute('label'))}</span>`;
  }
}
defineElement('pf-badge', PortfolioBadge);

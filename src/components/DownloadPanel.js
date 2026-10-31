import { defineElement, escapeHTML, safeHref } from '../utils/dom.js';
import './Button.js';

export class DownloadPanel extends HTMLElement {
  #files = [];
  set files(value) { this.#files = Array.isArray(value) ? value : []; if (this.isConnected) this.render(); }
  get files() { return this.#files; }
  connectedCallback() { this.render(); }
  render() {
    this.hidden = this.#files.length === 0;
    if (this.hidden) { this.replaceChildren(); return; }
    this.innerHTML = `<section class="download-panel" aria-label="학습 자료 다운로드"><h3>학습 자료 다운로드</h3><ul>${this.#files.map(file => `<li><div><strong>${escapeHTML(file.name)}</strong><p class="muted">${escapeHTML(file.format)} · ${escapeHTML(file.sizeLabel)}</p>${file.usage ? `<p class="download-panel__usage">${escapeHTML(file.usage)}</p>` : ''}</div><pf-button variant="secondary" label="${escapeHTML(file.name)} 다운로드" href="${escapeHTML(safeHref(file.href))}" download></pf-button></li>`).join('')}</ul><p class="muted download-panel__hint">브라우저에서 열리면 저장 버튼으로 내려받을 수 있습니다.</p></section>`;
  }
}
defineElement('pf-download-panel', DownloadPanel);

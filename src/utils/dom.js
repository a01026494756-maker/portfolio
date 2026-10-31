// 콘텐츠를 마크업에 넣을 때 특수 문자를 안전하게 변환합니다.
export function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

// 이동 주소에는 일반 웹 주소와 프로젝트 내부 경로만 허용합니다.
export function safeHref(value = '#') {
  const text = String(value).trim();
  if (!text || /[\u0000-\u0020\\]/.test(text)) return '#';
  try {
    const url = new URL(text, 'https://portfolio.invalid/');
    return ['http:', 'https:'].includes(url.protocol) ? text : '#';
  } catch { return '#'; }
}

export function defineElement(name, component) {
  if (!customElements.get(name)) customElements.define(name, component);
}

export function formatDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return '';
  return value.replaceAll('-', '. ') + '.';
}

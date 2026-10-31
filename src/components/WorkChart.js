import { defineElement } from '../utils/dom.js';

// 숫자와 단위가 없는 설명용 도표이며 실제 관측 결과로 사용하지 않습니다.
export class WorkChart extends HTMLElement {
  static observedAttributes = ['kind'];
  connectedCallback() { this.render(); }
  attributeChangedCallback() { if (this.isConnected) this.render(); }
  render() {
    const kind = this.getAttribute('kind') || 'regression';
    const plots = {
      regression: { description: '시간과 기온의 관계를 나타내는 설명용 산점도와 회귀선', y: '기온', body: `<path d="M44 130 267 44" stroke="#205c45" stroke-width="3"/><g fill="#52866a">${[[52,116],[73,130],[85,99],[101,113],[119,88],[138,103],[151,74],[174,86],[191,64],[214,72],[236,42],[260,58]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="4"/>`).join('')}</g>` },
      cumulative: { description: '배출률 곡선 아래의 면적이 누적 배출량임을 나타내는 설명용 도표', y: '배출률', body: `<path d="M44 145C120 144 207 126 267 32V150H44Z" fill="#c7dfea"/><path d="M44 145C120 144 207 126 267 32" fill="none" stroke="#315e73" stroke-width="3"/><text x="193" y="124" text-anchor="middle">누적 배출량</text><text x="193" y="141" text-anchor="middle">(곡선 아래 면적)</text>` },
      worksheet: { description: '서로 다른 데이터 표현을 비교해 보는 학습지 예시', y: '값', body: `<path d="m49 124 45-32 45 16 45-52 75-19" stroke="#315e73" stroke-width="3" fill="none"/><path d="m49 139 45-15 45 6 45-26 75-13" stroke="#205c45" stroke-width="3" stroke-dasharray="7 5" fill="none"/><text x="185" y="29">두 그래프는 어떻게 다를까요?</text>` }
    };
    const plot = plots[kind] || plots.regression;
    this.innerHTML = `<figure class="work-chart work-chart--${Object.hasOwn(plots, kind) ? kind : 'regression'}"><svg viewBox="0 0 320 190" role="img" aria-label="${plot.description}"><path d="M40 20V150H282" fill="none" stroke="#526159" stroke-width="1.5"/><text x="160" y="176" text-anchor="middle">시간</text><text x="19" y="87" text-anchor="middle" transform="rotate(-90 19 87)">${plot.y}</text>${plot.body}</svg><figcaption>설명용 도표 · 실제 관측값 아님</figcaption></figure>`;
  }
}
defineElement('pf-work-chart', WorkChart);

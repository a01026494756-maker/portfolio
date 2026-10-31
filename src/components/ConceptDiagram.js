import { defineElement } from '../utils/dom.js';

// 환경 관찰부터 해석까지의 관계를 장식보다 명확한 순서로 보여 줍니다.
export class ConceptDiagram extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<figure class="concept" aria-label="환경 데이터를 수학으로 분석하여 환경을 이해하는 세 단계"><h2 class="sr-only">환경을 이해하는 탐구 과정</h2>
      <ol class="concept__steps">
        <li><span class="concept__number">01</span><svg viewBox="0 0 120 100" aria-hidden="true"><circle cx="60" cy="50" r="34" fill="#d9e9df"/><path d="M35 31 52 23 60 37 76 32 87 48 71 57 66 78 49 71 45 53 32 44Z" fill="#72a382"/><path d="M17 25v42a10 10 0 1 0 12 0V25a6 6 0 0 0-12 0Z" fill="white" stroke="#205c45" stroke-width="3"/><path d="M23 42v32" stroke="#b77843" stroke-width="5" stroke-linecap="round"/><circle cx="23" cy="77" r="5" fill="#b77843"/></svg><h3>환경 데이터</h3><p>기온과 배출량 등<br>변화를 관찰합니다.</p></li>
        <li><span class="concept__number">02</span><svg viewBox="0 0 120 100" aria-hidden="true"><path d="M18 14v70h88" fill="none" stroke="#315e73" stroke-width="2"/><path d="m24 73 72-52" stroke="#205c45" stroke-width="3"/><g fill="#52866a"><circle cx="32" cy="61" r="4"/><circle cx="45" cy="65" r="4"/><circle cx="54" cy="43" r="4"/><circle cx="68" cy="48" r="4"/><circle cx="79" cy="27" r="4"/><circle cx="93" cy="31" r="4"/></g></svg><h3>수학적 분석</h3><p>데이터 속 패턴과<br>관계를 찾습니다.</p></li>
        <li><span class="concept__number">03</span><svg viewBox="0 0 120 100" aria-hidden="true"><path d="M30 73C24 36 56 20 95 18 96 55 79 79 45 74" fill="#a8c6a5"/><path d="M30 84 80 35m-31 27-2-21m16 6 20 1" fill="none" stroke="#205c45" stroke-width="3" stroke-linecap="round"/><circle cx="43" cy="47" r="21" fill="white" fill-opacity=".7" stroke="#315e73" stroke-width="4"/><path d="m28 64-14 15" stroke="#315e73" stroke-width="7" stroke-linecap="round"/></svg><h3>환경 이해</h3><p>결과와 한계를 읽고<br>다음 질문을 만듭니다.</p></li>
      </ol><figcaption>이해를 돕기 위한 개념도</figcaption></figure>`;
  }
}
defineElement('pf-concept-diagram', ConceptDiagram);

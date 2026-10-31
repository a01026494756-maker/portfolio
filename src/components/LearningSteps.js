import { defineElement } from '../utils/dom.js';

export class LearningSteps extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section class="learning" aria-labelledby="learning-title"><div class="container"><h2 id="learning-title">이렇게 탐구합니다</h2><ol class="learning__list"><li><span class="learning__icon" aria-hidden="true">?</span><div><h3>질문하기</h3><p>무엇이 달라지고 있을까?</p></div></li><li><span class="learning__icon learning__icon--blue" aria-hidden="true">∑</span><div><h3>분석하기</h3><p>어떤 관계가 숨어 있을까?</p></div></li><li><span class="learning__icon learning__icon--warm" aria-hidden="true">↗</span><div><h3>함께 배우기</h3><p>어떻게 설명할 수 있을까?</p></div></li></ol></div></section>`;
  }
}
defineElement('pf-learning-steps', LearningSteps);

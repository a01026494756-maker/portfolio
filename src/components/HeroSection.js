import { defineElement } from '../utils/dom.js';
import './Button.js';
import './ConceptDiagram.js';

export class HeroSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<section class="hero container" aria-labelledby="hero-title"><div class="hero__heading"><p class="eyebrow">수학으로 바라보는 지구의 변화</p><div class="hero__title-scroll"><h1 id="hero-title" class="hero__title">기초과학자로서 기후환경운동</h1></div><p class="hero__english" lang="en">Mathematics for a Greener Planet</p></div><div class="hero__copy"><p class="hero__question">수학으로 기후 변화를 읽을 수 있을까요?</p><p class="hero__description">데이터를 관찰하고, 수학으로 분석하고,<br class="desktop-break"> 환경을 이해하는 방법을 함께 탐구합니다.</p><div class="hero__actions"><pf-button label="탐구 프로젝트 살펴보기 →" href="#works"></pf-button><a class="text-link" href="#works" data-select-lessons>수업 자료 보기 →</a></div></div><pf-concept-diagram></pf-concept-diagram></section>`;
  }
}
defineElement('pf-hero', HeroSection);

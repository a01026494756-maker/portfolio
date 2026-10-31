import { defineElement, escapeHTML } from '../utils/dom.js';
import './Badge.js';

export class ProfileSection extends HTMLElement {
  #profile;
  set profile(value) { this.#profile = value; if (this.isConnected) this.render(); }
  get profile() { return this.#profile; }
  connectedCallback() { this.render(); }
  render() {
    const profile = this.#profile || { title: '수학으로 환경을 이해하는 일', description: '수학을 가르치고 연구하며, 함께 배우고 탐구할 수 있는 자료를 나눕니다.', interests: ['수학 교육', '기후환경', '수학적 탐구'], skills: '수학 수업 · 탐구 활동 설계' };
    this.innerHTML = `<section class="section container profile" aria-label="자기소개"><div><p class="eyebrow">자기소개</p><h2>${escapeHTML(profile.title)}</h2>${profile.name ? `<p class="profile__name">${escapeHTML(profile.name)}</p>` : ''}<p class="profile__description">${escapeHTML(profile.description)}</p></div><aside class="profile__aside" aria-label="관심 분야와 할 수 있는 일"><h3>관심 분야</h3><div class="tag-list">${(profile.interests || []).map(tag => `<pf-badge tone="project" label="${escapeHTML(tag)}"></pf-badge>`).join('')}</div><h3>함께할 수 있는 일</h3><p>${escapeHTML(profile.skills)}</p></aside></section>`;
  }
}
defineElement('pf-profile', ProfileSection);

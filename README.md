# 수학과 기후환경 포트폴리오 컴포넌트

`design.md`와 그림·도표 강화 시안을 바탕으로 만든 재사용 웹 컴포넌트 15개입니다. HTML·CSS·JavaScript 표준 기능으로 작성하여 React나 별도 패키지 설치 없이 사용할 수 있습니다. 모든 코드 주석은 한국어입니다.

현재 결과물은 **컴포넌트 라이브러리와 동작 미리보기**입니다. 실제 작업물 상세 페이지, 콘텐츠 파일 자동 게시, 관리자 편집, 호스팅 배포는 포함하지 않습니다. 작업물 예시는 실제 연구 실적이 아닙니다.

## 1. 실행하기

Node.js 20 이상이 필요합니다. `portfolio` 폴더를 터미널에서 열고 실행합니다.

```powershell
node server.mjs
```

브라우저에서 [로컬 미리보기](http://127.0.0.1:4173)를 엽니다. 중지하려면 실행한 터미널에서 `Ctrl+C`를 누릅니다. `index.html`을 더블클릭하는 방식은 ES 모듈과 문서 읽기 제한 때문에 지원하지 않습니다.

포트가 사용 중이라면 다음처럼 바꿀 수 있습니다.

```powershell
$env:PORT = '4174'
node server.mjs
```

미리보기 서버는 이 컴퓨터에서만 접근할 수 있는 개발용 서버입니다. 별도 설치나 빌드가 필요하지 않습니다. npm이 설치되어 있다면 `npm start`도 동일하게 동작합니다.

## 2. 파일 구조

```text
portfolio/
├─ index.html                 # 홈 조합과 컴포넌트 모아보기
├─ server.mjs                 # 로컬 미리보기 서버
├─ package.json
├─ README.md
├─ prd.md
├─ design.md
├─ scripts/
│  └─ check.mjs               # 구문·모듈 경로·안전 처리 확인
└─ src/
   ├─ demo.js                # 미리보기 연결 동작
   ├─ data/
   │  └─ exampleWorks.js     # 화면 확인용 예시 데이터
   ├─ utils/
   │  └─ dom.js              # 글자 이스케이프·주소 검사·날짜 표시
   ├─ styles/
   │  ├─ tokens.css          # 색상·크기·여백 공통값
   │  ├─ base.css            # 글꼴·본문·컨테이너·반응형 기본값
   │  └─ components.css      # 공통 컴포넌트의 상태와 배치
   └─ components/
      ├─ index.js           # 전체 컴포넌트 등록 및 내보내기
      ├─ Button.js
      ├─ Badge.js
      ├─ SiteHeader.js
      ├─ SiteFooter.js
      ├─ HeroSection.js
      ├─ ConceptDiagram.js
      ├─ LearningSteps.js
      ├─ ProfileSection.js
      ├─ WorkChart.js
      ├─ WorkCard.js
      ├─ FilterGroup.js
      ├─ WorkGrid.js
      ├─ EmptyState.js
      ├─ NoticeBox.js
      └─ DownloadPanel.js
```

스타일은 색상 변경을 쉽게 하기 위해 공통 CSS 파일로 분리했습니다. 컴포넌트마다 동작 파일을 나누고 데이터와 화면 코드를 분리했습니다. Shadow DOM을 사용하지 않으므로 실제 링크·버튼·제목을 일반 HTML처럼 검사하고 공통 스타일을 적용할 수 있습니다.

## 3. 다른 페이지에서 사용하기

페이지의 `<head>`에 스타일과 모듈을 연결합니다. 개별 컴포넌트만 쓰려면 `index.js` 대신 해당 파일을 가져와도 됩니다. 각 컴포넌트는 필요한 하위 컴포넌트를 직접 가져옵니다.

```html
<link rel="stylesheet" href="./src/styles/base.css">
<link rel="stylesheet" href="./src/styles/components.css">
<script type="module" src="./src/components/index.js"></script>
```

`pf-`로 시작하는 태그가 재사용 컴포넌트입니다. 속성은 HTML에 적는 짧은 설정이며, 배열·객체 데이터는 JavaScript 프로퍼티로 전달합니다.

## 4. 컴포넌트별 사용법

| 파일 / 태그 | 입력 | 역할 |
|---|---|---|
| `Button.js` / `pf-button` | `label`, `href`, `variant`, `size`, `disabled`, `download` | 주요·보조 버튼과 이동 링크 |
| `Badge.js` / `pf-badge` | `label`, `tone` | 종류 배지와 수학 개념 태그 |
| `SiteHeader.js` / `pf-site-header` | `brand`, `current`, `home-href`, `about-href`, `works-href` | 공통 메뉴 |
| `SiteFooter.js` / `pf-site-footer` | `brand`, `usage-href` | 사이트 이름과 자료 이용 안내 |
| `HeroSection.js` / `pf-hero` | 기본 콘텐츠 사용 | 핵심 소개와 행동 링크 |
| `ConceptDiagram.js` / `pf-concept-diagram` | 기본 콘텐츠 사용 | 환경 데이터 → 수학적 분석 → 환경 이해 |
| `LearningSteps.js` / `pf-learning-steps` | 기본 콘텐츠 사용 | 질문하기 → 분석하기 → 함께 배우기 |
| `ProfileSection.js` / `pf-profile` | `profile` 프로퍼티 | 자기소개·관심 분야·할 수 있는 일 |
| `WorkChart.js` / `pf-work-chart` | `kind` | 설명용 수학 도표 |
| `WorkCard.js` / `pf-work-card` | `work` 프로퍼티 | 개별 작업물 카드 |
| `FilterGroup.js` / `pf-filter-group` | `value` 프로퍼티 | 종류 필터와 선택 상태 |
| `WorkGrid.js` / `pf-work-grid` | `works`, `filter` 프로퍼티 | 필터·정렬·작업물 카드·빈 상태 |
| `EmptyState.js` / `pf-empty-state` | `heading`, `description`, `action-label`, `action-href` | 자료가 없는 상태 |
| `NoticeBox.js` / `pf-notice` | `heading`, `description`, `tone` | 일반·주의·오류 안내 |
| `DownloadPanel.js` / `pf-download-panel` | `files` 프로퍼티 | 첨부파일과 이용 안내 |

### 버튼·배지·안내

```html
<pf-button label="작업물 보기 →" href="#works"></pf-button>
<pf-button label="목록으로 돌아가기" href="/works/" variant="secondary"></pf-button>
<pf-button label="작은 버튼" size="small"></pf-button>
<pf-button label="비활성 버튼" disabled></pf-button>
<pf-badge label="프로젝트" tone="project"></pf-badge>
<pf-badge label="수업 자료" tone="lesson"></pf-badge>
<pf-badge label="미적분" tone="neutral"></pf-badge>
<pf-notice tone="warning" heading="해석의 한계" description="데이터 범위와 가정을 함께 확인하세요."></pf-notice>
```

`variant`는 `primary`·`secondary`, `size`는 `small`·기본값, 배지 `tone`은 `project`·`lesson`·`neutral`, 안내 `tone`은 `info`·`warning`·`error`를 지원합니다. `disabled`·`download`는 값 없이 적는 불리언 속성입니다. `disabled="false"`도 속성이 존재하므로 비활성입니다. 활성화하려면 속성 자체를 제거합니다.

버튼에 `href`가 있으면 링크, 없으면 실제 버튼입니다. 버튼 동작은 일반 클릭 이벤트를 연결합니다. 주요 버튼은 최소 48px, 작은 버튼은 최소 44px이며 내용이 길면 늘어납니다.

```js
document.querySelector('pf-button').addEventListener('click', event => {
  // 비활성 버튼은 실행하지 않도록 실제 버튼 상태를 확인합니다.
  if (event.target.closest('button:disabled')) return;
});
```

### 메뉴와 기본 섹션

```html
<pf-site-header current="works" home-href="/" about-href="/#about" works-href="/works/"></pf-site-header>
<pf-hero></pf-hero>
<pf-learning-steps></pf-learning-steps>
<pf-profile id="about"></pf-profile>
<pf-site-footer usage-href="/#usage"></pf-site-footer>
```

헤더의 `current`는 `home`·`about`·`works`입니다. 기본 링크는 현재 미리보기의 단일 화면 구조를 기준으로 합니다. 실제 목록·상세 페이지가 생기면 위처럼 주소를 지정합니다. 홈 대표 섹션들은 페이지당 하나씩 배치합니다. 히어로 문구와 기본 섹션의 콘텐츠는 해당 파일에서 수정할 수 있습니다.

홈의 메뉴 활성 전환과 ‘수업 자료 보기’ 클릭 시 필터 적용은 `demo.js`에 분리되어 있습니다. 다른 페이지에 컴포넌트만 가져올 때 자동으로 적용되지 않으므로 해당 페이지의 흐름에 맞게 연결합니다.

### 자기소개 데이터

```js
const profile = document.querySelector('pf-profile');
profile.profile = {
  name: '실제 이름 또는 활동명',
  title: '수학으로 환경을 이해하는 일',
  description: '직접 작성한 자기소개 문장입니다.',
  interests: ['수학 교육', '기후환경'],
  skills: '실제로 할 수 있는 활동을 작성합니다.'
};
```

이름이 없으면 이름 행을 숨깁니다. 기본 제공 소개는 PRD의 설명에 기반한 예시이며 실제 게시 전 확인합니다.

### 작업물 카드와 목록

```js
const work = {
  id: 'my-project',
  title: '작업물 제목',
  type: 'project',
  summary: '한두 문장의 설명',
  mathTopics: ['통계', '회귀 분석'],
  level: '대학 기초',
  publishedAt: '2026-10-31',
  href: '/works/my-project/',
  draft: false,
  example: false
};
document.querySelector('pf-work-grid').works = [work];
document.querySelector('pf-work-grid').filter = 'project';
```

- `type`: `project` 또는 `lesson`
- `filter`: `all`·`project`·`lesson`
- `draft`: 명시적으로 `false`인 항목만 목록에 표시
- `chart`: 선택 사항, `regression`·`cumulative`·`worksheet`
- `example`: 예시 자료임을 카드에 표시할 때 `true`
- `href`: 실제 상세 페이지 주소. 예시의 `#example-...` 주소는 미리보기 창에 연결됩니다.

`chart`를 생략하면 이미지 없는 텍스트 카드가 됩니다. 한 개 카드만 필요하면 `pf-work-card`의 `work` 프로퍼티에 객체를 전달합니다. `WorkCard` 자체는 전달받은 항목을 표시하므로 개별 사용 시에도 공개 가능한 자료인지 호출하는 쪽에서 확인합니다.

목록은 공개일 최신순, 같은 날은 제목순으로 정렬합니다. 필터를 바꿀 때 결과 수를 보조기기에 알리고 키보드 초점을 유지합니다. 단독 필터의 이벤트는 다음처럼 사용합니다.

```js
document.querySelector('pf-filter-group').addEventListener('filter-change', event => {
  // 선택값을 다른 목록이나 페이지 상태에 전달합니다.
  console.log(event.detail.value);
});
```

도표는 모두 설명용 SVG입니다. 누적량 도표의 세로축은 배출률이고 시간에 대한 곡선 아래 면적이 누적 배출량을 뜻합니다. 실제 데이터의 시각화가 필요하면 데이터·단위·기간·출처를 받는 별도 차트 구현으로 확장합니다.

브라우저에서 초안을 숨기는 것은 비공개 저장을 보장하지 않습니다. 실제 사이트에서는 초안 파일과 비공개 첨부파일을 배포 결과에서 제외해야 합니다.

### 다운로드와 빈 상태

```js
document.querySelector('pf-download-panel').files = [{
  name: '활동지',
  format: 'PDF',
  sizeLabel: '실제 파일에서 계산한 용량',
  href: '/downloads/my-project/worksheet.pdf',
  usage: '운영자가 정한 자료 이용 범위'
}];
```

`files`가 빈 배열이면 다운로드 영역을 숨깁니다. 파일 용량은 실제 파일에서 계산해 전달해야 합니다. `demo.js`에는 기획 문서 두 개를 읽고 실제 바이트 수를 표시하는 예제가 있습니다. 다운로드 완료 여부를 임의로 알리지 않습니다.

```html
<pf-empty-state
  heading="아직 등록된 자료가 없습니다."
  description="다른 분류를 확인해 보세요."
  action-label="전체 보기">
</pf-empty-state>
```

`action-href`가 없으면 버튼을 렌더링하므로 호출하는 쪽에서 클릭 동작을 연결합니다. `WorkGrid` 안에서는 자동으로 전체 필터에 연결됩니다.

## 5. 디자인 수정하기

전체 색상과 여백은 `src/styles/tokens.css`에서 바꿉니다. 컴포넌트의 시각 스타일은 `components.css`, 본문과 페이지 배치는 `base.css`에서 조정합니다.

기본 글꼴은 **Pretendard Variable**입니다. `base.css`에서 공식 배포 안내의 jsDelivr 가변 다이나믹 서브셋(v1.3.9)을 불러오고, `tokens.css`의 `--font-family-sans`로 전체 화면에 적용합니다. 외부 웹폰트를 불러오려면 인터넷 연결이 필요하며, 실패하면 Noto Sans KR·맑은 고딕 등으로 표시합니다. [공식 폰트 안내](https://github.com/orioncactus/pretendard)

- 모바일: 카드 1열, 메뉴 2줄, 주요 행동 버튼 전체 너비
- 768px 이상: 카드 2열, 메뉴 한 줄
- 1200px 이상: 카드 3열, 첫 소개와 개념도 2열
- 설명용 개념도: 480px 미만에서는 세로로 전환
- 키보드 초점: 흰색 간격 바깥 초록 외곽선
- 움직임 줄이기 설정: 전환 효과 중지

## 6. 확인하기

```powershell
node scripts/check.mjs
```

자바스크립트 구문, 상대 모듈 경로, HTML 문자 변환과 위험한 주소 차단을 확인합니다. 브라우저에서는 필터, 카드 미리보기, 닫기와 Escape, 실제 파일 링크를 확인합니다. 개발용 미리보기 창은 표준 `dialog`를 사용해 초점 제한·Escape 닫기·원래 링크로 초점 복귀를 지원합니다.

실제 서비스로 확장할 때는 PRD의 작업물 상세, 빌드 단계 초안 제외·필드 검증, 콘텐츠 관리, 검색 노출, 배포·복구 절차를 추가해야 합니다.

import type { Skill } from '../models/Resume';

export const react: Skill = {
  name: 'React',
  description: `다른 프론트엔드 라이브러리(또는 프레임워크)보다 사용자 수가 많아 커뮤니티의 도움을 쉽게 받을 수 있을 것이라 생각하고 사용하였습니다.\n또한 JSX 문법을 이용하여 html과 동일한 문법으로 컴포넌트를 작성할 수 있습니다.
  `,
};

export const styledComponents: Skill = {
  name: 'Styled-Components',
  description: `CSS-in-JS를 이용하여 컴포넌트를 작성하며, css의 클래스명을 고려할 필요가 없습니다.
  또한 prop을 활용하여 동적으로 스타일 변경이 가능합니다.
  `,
};

export const tailwind: Skill = {
  name: 'Tailwind CSS',
  description:
    '보다 빠르게 통일감 있는 디자인을 구현하기 위하여 TailwindCSS를 사용하였습니다.',
};

export const next: Skill = {
  name: 'nextJS',
  description:
    'React의 프레임워크 중 하나로 페이지 라우팅을 지원하며, 서버 사이드 렌더링을 지원하기 때문에 검색 엔진 최적화에 용이합니다.',
};

export const jest: Skill = {
  name: 'Jest',
  description: `유틸 함수들에 대한 검증을 위하여 Jest를 이용하여 테스트 코드를 작성하였습니다.`,
};

export const storybook: Skill = {
  name: 'Storybook',
  description: `작은 컴포넌트를 화면에 연결하지 않고 다양한 케이스에 대한 대응이 되는지 확인하기 위해 사용했습니다.`,
};

export const githubActions: Skill = {
  name: 'Github-Actions',
  description: `계속해서 빌드 테스트와 테스트 코드를 실행하는 것이 다소 귀찮다고 생각하여 pull request시 빌드부터 테스트코드까지 실행을 자동화 하고, 지속적 통합 흐름을 구축하기 위해 사용했습니다.`,
};

export const django: Skill = {
  name: 'Django',
  description: `간단한 api 서버를 구축하기 위하여, 기존의 python 언어가 익숙하여 python의 프레임워크인 Django를 사용했습니다.`,
};

export const typescript: Skill = {
  name: 'TypeScript',
  description:
    '인터페이스를 선언하여 인터페이스 외의 프로퍼티에 접근할 경우 에러를 내주어 생산성 향상에 기여할 수 있습니다.\n또한 인터페이스만 보고 빠르게 속성을 파악할 수 있기 때문에 협업에 큰 도움이 됩니다.',
};

export const emotion: Skill = {
  name: 'Emotion',
  description:
    'React의 장점을 살리기 위하여 prop을 통해 동적으로 스타일을 바꿀 수 있는 CSS-in-JS 패키지를 선택했습니다.\n기본적으로 Styled-Components와 비슷하지만 사용자가 조금 더 많습니다.',
};

export const webpack: Skill = {
  name: 'Webpack',
  description:
    '패키지를 번들링하기 위하여 웹팩을 사용하였습니다. 웹팩은 번들링 툴 중 가장 큰 커뮤니티를 가지고 있으며 역사가 오래되어 안정성이 높다고 판단했습니다.',
};

export const babel: Skill = {
  name: 'Babel',
  description:
    'JSX 문법을 해결하기 위하여 바벨을 사용하였습니다.\n또한 Babel은 같은 역할을 수행하는 다른 트랜스파일러에 비해 더 많은 사용자를 확보하고 있으며 플러그인이 많아 원하는 옵션으로 사용할 수 있습니다.',
};

export const vanillaJS: Skill = {
  name: 'Vanilla JS',
  description:
    '외부 라이브러리의 도움 없이 모든 부분을 순수 JavaScript로 구현하기 위하여 다른 모듈을 사용하지 않았습니다.',
};

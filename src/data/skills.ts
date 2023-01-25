import type { Skill } from '../models/Project';

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

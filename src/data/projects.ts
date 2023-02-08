import {
  react,
  styledComponents,
  jest,
  storybook,
  githubActions,
  django,
  typescript,
  emotion,
  webpack,
  babel,
  vanillaJS,
} from './skills';
import type { Project } from '../models/Resume';

export const chulcheck: Project = {
  title: '출첵(chulcheck)',
  introduction: '스터디를 할 때 팀원의 출석 관리를 도와줄 수 있는 웹 앱입니다.',
  description: [
    '달력의 핵심 로직과 컴포넌트를 구현하였고, 달력 구성에 필요한 로직을 재사용할 수 있도록 custom hook으로 분리',
    '달력에서 사용되는 데이터의 접근 시 시간복잡도를 기존 O(N)에서 O(1)으로 개선',
    '재사용성을 고려한 컴포넌트 구현',
    'Dropdown 컴포넌트의 경우 응집도를 높이기 위해 열림, 닫힘 상태를 내부적으로 관리하고, cloneElement를 이용하여 상태가 prop에 전달하도록 구현',
    '실제 사용시 상태 변경을 일으킬 trigger와 배열 형태의 데이터를 삽입하면 사용할 수 있도록 사용성을 개선',
    '라이트하우스 성능 측정을 통해 총 성능 점수를 약 20% 향상',
    '지속적 통합을 위한 흐름을 구축하고, 반복적으로 진행되는 작업을 자동화',
    'storybook을 통한 작은 컴포넌트 관리',
    'Jest를 이용하여 유틸리티 함수들에 대해 엣지 케이스 구성하고 테스트를 진행',
    'github actions을 통한 빌드 - 테스트과정 자동화',
  ],
  skills: [
    typescript,
    react,
    styledComponents,
    jest,
    storybook,
    githubActions,
    django,
  ],
  startDate: '2022-10',
  links: {
    github: { name: 'Github', url: 'https://github.com/mrbartrns/chulcheck' },
    portfolio: {
      name: 'Portfolio',
      url: 'https://noble-fisherman-5cc.notion.site/chulcheck-fa72db4742044022a654b1cf4e90910e',
    },
  },
  otherLinks: [
    {
      name: '달력 컴포넌트에서 시간복잡도 개선하기(notion)',
      url: 'https://noble-fisherman-5cc.notion.site/chulcheck-fa72db4742044022a654b1cf4e90910e#b449e61667364040a93f78aac94c8467',
    },
  ],
};

export const chequiz: Project = {
  title: '체퀴즈온더코드블록(Chequiz)',
  introduction:
    '개발자를 위한 간단한 지식 체크 서비스를 제공합니다. RPG적 요소와 퀴즈를 합쳐서 보다 재미있게 풀 수 있도록 시도해 보았습니다.',
  description: [
    '면담을 통해 팀원의 관심사와 성향을 파악, 본 프로젝트 이전에 친밀감을 형성',
    '노션 팀 페이지 내 화이트보드 도입으로 보다 자유로운 의견 제안 환경을 구성하고, 데일리 스크럼때 이를 공유하여 스크럼 시간을 단축',
    'TypeScript 사용시 장점에 대해 팀원에게 설명하고 도입을 제안',
    'Webpack과 Babel을 이용하여 React 초기 구동 환경을 구성하였고, 팀 컨벤션을 바탕으로 eslint, prettier를 설정',
    '사용자가 임의의 퀴즈 풀을 요청할 때, 셔플 알고리즘을 이용하여 퀴즈가 보다 골고루 출제될 수 있도록 개선',
    '기존에 작성했던 코드에 대해 가독성이 많이 떨어짐을 인식하고, 이에 대하여 담당 부분을 리팩토링',
    '서비스에 필요한 유스케이스를 산출하고, 우선순위를 부여하여 주어진 시간 내에 핵심 기능들을 먼저 구현',
  ],
  skills: [typescript, react, emotion, webpack, babel],
  startDate: '2022-06',
  endDate: '리팩토링 중',
  links: {
    github: { name: 'Github', url: 'https://github.com/mrbartrns/chequiz' },
    portfolio: {
      name: 'Portfolio',
      url: 'https://noble-fisherman-5cc.notion.site/CheQuiz-463975faff404f3f9250ee95ef1c6b31',
    },
    website: {
      name: 'Website',
      url: 'https://main.d32yumw4llxi0t.amplifyapp.com/',
    },
  },
  otherLinks: [
    {
      name: '추후 리액트 환경 구성시 빠르게 세팅이 가능하도록 만든 react typescript boilerplate',
      url: 'https://github.com/mrbartrns/react-typescript-boilerplate',
    },
    {
      name: '체퀴즈온더코드블록 프로젝트 회고',
      url: 'https://velog.io/@mrbartrns/team-1-project',
    },
  ],
};

const vanillaEditor: Project = {
  title: '바닐라에디터(vanilla-notion)',
  introduction:
    '오직 Vanilla JS만을 사용하여 노션의 사이드바와 에디터를 구현하는 프로젝트입니다. 개발 후 TypeScript로 재작성 하였습니다.',
  description: [
    '기존 App 컴포넌트가 너무 비대해지는 문제점을 해결하기 위해, 전역적으로 사용되는 상태를 Observer Pattern을 이용하여 컴포넌트 외부로 분리',
    'App 컴포넌트 코드 약 60% 단축',
    '실시간 자동 저장 기능을 구현하였으며, 500ms의 debounce를 적용하여 불필요한 api 요청 횟수 개선',
    'Webpack과 Babel을 이용하여 React 초기 구동 환경을 구성하였고, 팀 컨벤션을 바탕으로 eslint, prettier를 설정',
    'TypeScript를 배우면서, 기존에 작성했던 JavaScript 코드를 리라이팅하며 학습',
  ],
  skills: [vanillaJS, typescript],
  startDate: '2022-04',
  endDate: '2022-04',
  links: {
    github: {
      name: 'Github',
      url: 'https://github.com/mrbartrns/vanilla-editor',
    },
    portfolio: {
      name: 'Portfolio',
      url: 'https://noble-fisherman-5cc.notion.site/Vanilla-Editor-8bc61c31020e4f3bb1e9b3672e63c446',
    },
    website: {
      name: 'Website',
      url: 'https://vanilla-editor.vercel.app/',
    },
  },
  otherLinks: [
    {
      name: '바닐라 에디터 프로젝트 회고',
      url: 'https://velog.io/@mrbartrns/vanilla-editor-project',
    },
  ],
};

const projects: Project[] = [chulcheck, chequiz, vanillaEditor];

export default projects;

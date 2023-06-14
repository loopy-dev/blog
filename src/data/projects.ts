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
  tailwind,
  next,
  rollUp,
} from './skills';
import type { Project } from '../models/Resume';

export const gistReact: Project = {
  title: 'gist-react',
  introduction:
    'gist를 embed 할 때 사용했던 패키지가 최신 버전을 지원하지 않아, 직접 만들고 배포했습니다.',
  startDate: '2023-06',
  skills: [typescript, react, rollUp],
  description: [
    'github gist를 보다 쉽게 embed 할 수 있도록 개발 및 npm 배포',
    '최신 문법으로 작성되어 React의 최신 버전을 지원하며, Rollup 번들러로 패키지를 관리',
    '주간 다운로드 수 800 달성',
    '현재 블로그에서 직접 만든 패키지로 대체하였음',
    {
      name: '다사다난했던 npm 패키지 배포(iframe, embed등)',
      url: '/posts/publish-npm-package',
    },
  ],
  links: {
    github: { name: 'Github', url: 'https://github.com/mrbartrns/gist-react' },
    website: {
      name: 'Website',
      url: 'https://www.npmjs.com/package/gist-react',
    },
  },
};

export const blog: Project = {
  title: '블로그(Blog)',
  introduction:
    '기존에 사용하던 블로그 서비스를 대체하고, 개발했던 프로덕트를 한 곳에 모아보기 위해 개발한 사이트입니다.',
  startDate: '2023-01',
  skills: [typescript, react, next, tailwind, styledComponents],
  description: [
    '마크 다운 파일 기반 정적 블로그 서비스',
    '백엔드로부터 자유롭게 개발 진행(firbase store를 이용한 피드백 페이지, utterances api issue 기반 댓글 시스템, 외부 api를 활용한 조회수 기능 등)',
    '느린 초기 로딩속도 개선을 위한 페이지 분석 및 개선 작업 진행 (번들 파일 분석 및 코드 스플리팅으로 번들 크기 축소, 리소스 분석을 통한 요청 리소스 파일 크기 최적화)',
    'web vital 성능 점수를 60 → 90점으로 50% 개선',
    'vercel analytics, ga를 통한 유입 관리 및 web vital 체킹',
    '사용성 경험을 개선하기 위한 작업 및 리팩토링 진행 중(블로그에 진행 사항을 기록 중에 있습니다.)',
  ],
  links: {
    github: { name: 'Github', url: 'https://github.com/mrbartrns/portfolio' },
    website: { name: 'Website', url: 'https://portfolio-mrbartrns.vercel.app' },
  },
  otherLinks: [
    {
      name: '블로그 이주하기 - 자체 서비스를 만들기 위한 첫 걸음',
      url: 'https://portfolio-mrbartrns.vercel.app/posts/%EB%B8%94%EB%A1%9C%EA%B7%B8%20%EC%9D%B4%EC%A3%BC%ED%95%98%EA%B8%B0%20-%20%EC%9E%90%EC%B2%B4%20%EC%84%9C%EB%B9%84%EC%8A%A4%EB%A5%BC%20%EB%A7%8C%EB%93%A4%EA%B8%B0%20%EC%9C%84%ED%95%9C%20%EC%B2%AB%20%EA%B1%B8%EC%9D%8C',
    },
    {
      name: '블로그를 만들면서 마주쳤던 어려움들',
      url: 'https://portfolio-mrbartrns.vercel.app/posts/%EB%B8%94%EB%A1%9C%EA%B7%B8%EB%A5%BC%20%EB%A7%8C%EB%93%A4%EB%A9%B4%EC%84%9C%20%EB%A7%88%EC%A3%BC%EC%B9%9C%20%EC%96%B4%EB%A0%A4%EC%9B%80%EB%93%A4',
    },
    {
      name: '블로그 가독성 개선하기',
      url: 'https://portfolio-mrbartrns.vercel.app/posts/improve-post-readability',
    },
    {
      name: '블로그 다크모드 적용기',
      url: 'https://portfolio-mrbartrns.vercel.app/posts/blog-dark-mode',
    },
    {
      name: '백엔드 없이 블로그 추가 기능 구현하기(feat. 댓글과 조회수기능, 추천 포스트)',
      url: 'https://portfolio-mrbartrns.vercel.app/posts/new-blog-features',
    },
    {
      name: '클로저를 활용하여 커스텀 알림창 구현하기',
      url: 'https://portfolio-mrbartrns.vercel.app/posts/create-custom-alert-component',
    },
  ],
};

export const chulcheck: Project = {
  title: '출첵(chulcheck)',
  introduction: '스터디를 할 때 팀원의 출석 관리를 도와줄 수 있는 웹 앱입니다.',
  description: [
    '달력의 핵심 로직 및 컴포넌트 구현',
    '달력에서 사용되는 데이터의 접근 시 시간복잡도를 기존 O(N)에서 O(1)으로 개선',
    'React 최상위 api를 이용한 유연한 컴포넌트 구축',
    'createElement를 이용하여 이벤트 프록시 구축, 하위 컴포넌트와의 결합도 축소',
    'storybook 기반 시각화로 컴포넌트를 관리',
    '지속적 통합을 위한 흐름을 구축 및 반복 작업 자동화',
    'Jest를 이용하여 utility functions에 대해 엣지 케이스 구성 및 테스트',
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
  endDate: '2022-12',
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
    '면담을 통해 팀원의 관심사와 성향을 파악, 친밀감 형성',
    '자유로운 의견 제안 환경을 위해 팀 페이지 내 화이트보드 도입, 데일리 스크럼 시간 단축',
    '서비스에 필요한 유스케이스를 산출 및 우선순위 부여, 주어진 시간 내에 핵심 기능들 우선 구현',
    'TypeScript 장점을 팀원들과 공유 및 도입 제안',
    'Webpack과 Babel 기반 React 스캐폴딩 구축',
    '팀 컨벤션 기반 eslint 및 prettier 구축 및 husky, lint-staged를 통한 개발 프로세스 개선',
    'React 스캐폴딩 템플릿 구성 및 유지 보수',
    'REST API 기반 퀴즈 풀기 및 해결 페이지 구현',
    '사용자가 다양한 문제를 경험할 수 있도록 셔플 알고리즘 도입, 편향되지 않도록 퀴즈 풀 생성',
    '가독성 개선을 위해 담당 부분 리팩토링 진행',
  ],
  skills: [typescript, react, emotion, webpack, babel],
  startDate: '2022-06',
  endDate: '리팩토링 중(백엔드 서비스 중지)',
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
      name: '추후 리액트 환경 구성시 빠르게 세팅이 가능하도록 만든 react 스캐폴딩 템플릿',
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
    '순수 JavaScript 기반 상태 기반 렌더링 구현, 상태 기반 렌더링 컴포넌트, 라우팅 및 API요청 처리',
    '컴포넌트 복잡도를 해결하기 위해 상태 코드를 컴포넌트 외부로 분리',
    'Observer pattern 기반 전역 상태 관리 구현, 상태 변경 시 렌더링 처리',
    'App 컴포넌트 300라인의 코드를 약 66% 간소화',
    '실시간 자동 저장 기능 구현을 위한 debounce 도입, 500ms의 debounce를 적용하여 불필요한 api 요청 횟수 개선',
    'TypeScript를 학습하며 기존에 작성했던 JavaScript 코드 리라이팅 진행',
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

const projects: Project[] = [gistReact, blog, chequiz, vanillaEditor];

export default projects;

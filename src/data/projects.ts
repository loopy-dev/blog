import {
  react,
  styledComponents,
  jest,
  storybook,
  githubActions,
  django,
} from './skills';
import type { Project } from '../models/Project';

const mock: Project = {
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
  skills: [react, styledComponents, jest, storybook, githubActions, django],
  startDate: '2022-10',
  links: {
    github: { name: 'Github', url: 'https://github.com/mrbartrns/chulcheck' },
    portfolio: {
      name: 'Portfolio',
      url: 'https://noble-fisherman-5cc.notion.site/chulcheck-fa72db4742044022a654b1cf4e90910e',
    },
  },
  otherLinks: [
    { name: 'Github', url: 'https://github.com/mrbartrns/chulcheck' },
    { name: 'Google', url: 'https://www.google.com' },
  ],
};

export default mock;

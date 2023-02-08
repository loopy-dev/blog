import type { Education } from '../models/Resume';

export const speakAndLearn: Education = {
  title: '말하면서 배워요 스터디',
  startDate: '2022-04',
  endDate: '2022-09',
  introduction:
    '함께 주제를 선정하고 공부하며 질답 방식을 통해 학습 내용을 정리하는 스터디에 참여했습니다.',
  description: [
    '스터디 팀원으로 참여하였으며, 운영진으로서 활동',
    '주기적으로 회고를 진행하며 스터디 시간을 효율적으로 사용하고, 팀원의 부담감을 낮추는 방향으로 진행 방식을 개선',
  ],
  links: {
    github: {
      name: 'github',
      url: 'https://github.com/prgrms-web-devcourse/FE-Speak-And-Learn-Study',
    },
    website: {
      name: '말배 로그',
      url: 'https://develop-water.notion.site/2c3ac45f25e448efafab238e4deee9ce',
    },
  },
};

export const algorithm: Education = {
  title: '알고리즘 문제 해결',
  startDate: '2020.02',
  introduction:
    '개발을 본격적으로 시작하게 된 계기가 된, 알고리즘 문제 해결을 취미로 진행하고 있습니다.',
  description: [
    '백준 플랫폼에서 약 650문제를 해결, 현재 플래티넘 5단계',
    '해결 여부와 관계 없이 다른 사람들의 풀이를 참고하며 로직의 다양성과 유연한 사고에 대해 학습',
    '풀이시 프로젝트 진행과 다른 패러다임으로 의도적으로 접근(iteration → recursion)',
    '팀원을 대상으로 그래프, 트리, 탐색 알고리즘 지식 공유 세션 진행',
  ],
  links: {
    github: {
      name: 'github',
      url: 'https://github.com/mrbartrns/algorithm-v2',
    },
  },
  otherLinks: [
    { name: 'Baekjoon Profile', url: 'https://www.acmicpc.net/user/mrbartrns' },
  ],
};

export const blog: Education = {
  title: '개인 블로그',
  startDate: '2022-03',
  introduction:
    '공부를 하면서 배웠던 지식들을 기록하고 생각을 정리하기 위한 블로그를 운영하고 있습니다.',
  links: {
    website: {
      name: 'blog',
      url: 'https://velog.io/@mrbartrns',
    },
  },
  otherLinks: [
    {
      name: '코딩테스트 준비 플랫폼 비교. 나에게는 어떤 플랫폼이 어울릴까?',
      url: 'https://velog.io/@mrbartrns/prepare-for-coding-test',
    },
    {
      name: 'React에서 재사용 가능한 버튼 컴포넌트 만들어보기',
      url: 'https://velog.io/@mrbartrns/%EC%9E%AC%EC%82%AC%EC%9A%A9-%EA%B0%80%EB%8A%A5%ED%95%9C-%EB%B2%84%ED%8A%BC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-React',
    },
    {
      name: '[TIL] IntersectionObserver에 대해 알아보자',
      url: 'https://velog.io/@mrbartrns/TIL-IntesectionObserver%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90',
    },
  ],
};

export const activities = [blog, algorithm, speakAndLearn];

import { filterPostsByKeywordsAndTags } from './postQuery-client';
import type { FrontMatter } from '~models/Post';

describe('post query test', () => {
  const posts: FrontMatter[] = [
    {
      title: '클로저를 활용하여 커스텀 알림창 구현하기',
      createdTime: '2023-05-27',
      tags: ['projects', 'React', 'Next.js', 'frontend'],
      description: '커스텀 알림 컴포넌트를 구현해보자',
      url: 'create-custom-alert-component',
    },
    {
      title:
        '백엔드 없이 블로그 추가 기능 구현하기(feat. 댓글과 조회수기능, 추천 포스트)',
      createdTime: '2023-05-19',
      tags: ['projects', 'React', 'Next.js', 'frontend'],
      description: '블로그 추가 기능들을 구현해보자. 백엔드 없이!',
      url: 'new-blog-features',
    },
    {
      title: 'styled components에서 sass + tailwind로 넘어가기',
      createdTime: '2023-05-08',
      tags: ['React', 'frontend', 'tailwind', 'sass'],
      description:
        'styled-components에서 sass + tailwind로 옮겨가는 선택을 했다...!',
      url: 'move-from-css-in-js-to-tailwind-sass',
    },
    {
      title: '블로그 가독성 개선하기',
      createdTime: '2023-04-25',
      tags: ['projects', 'React', 'Next.js', 'frontend', '사용자 경험'],
      description: '기존의 포스트의 가독성을 개선해보자.',
      url: 'improve-post-readability',
    },
    {
      title: 'create-react-app은 더 이상 최선의 선택이 아닐 수 있다.',
      createdTime: '2023-04-12',
      tags: ['React', 'Next.js', 'webpack', 'babel'],
      description: 'create-react-app은 여전히 최선의 선택일까?',
      url: 'is-create-react-app-still-usuable',
    },
    {
      title: '블로그 다크모드 적용기',
      createdTime: '2023-04-04',
      tags: ['projects', 'React', 'Next.js', 'frontend', 'darkmode'],
      description: '좌충우돌 다크모드 적용기 in next.js',
      url: 'blog-dark-mode',
    },
    {
      title: '왜 그 때는 몰랐을까, Next.js의 편리함을',
      createdTime: '2023-03-25',
      tags: ['projects', 'React', 'Next.js', 'frontend'],
      description:
        'Next.js를 이번 프로젝트에 본격적으로 사용하면서 여러 편리한 기능들을 사용하면서 느낀점과 기존 React에서는 어떻게 같은 기능을 구현했었는지 비교하는 시간을 가졌다.',
      url: 'next-js-is-really-convenient',
    },
    {
      title: '팀 프로젝트를 하면서 느꼈던 점들',
      createdTime: '2023-03-15',
      tags: ['frontend', 'projects'],
      description:
        '팀 프로젝트 경험은 많이 없지만, 데브코스를 진행하면서 총 두 번의 팀 프로젝트를 경험했다. 느끼기에 정말 좋았고, 잘 진행됬던 팀 프로젝트도 있지만, 그렇지 않았던 프로젝트도 있다. 무엇이 문제였는지, 앞으로 어떻게 진행하면 좋을 지에 대한 내용들을, 다소 시간이 지났지만 한 번 되짚어  보는 시간을 가져보기로 했다.',
      url: '팀 프로젝트를 하면서 느꼈던 점들',
    },
    {
      title: '블로그를 만들면서 마주친 어려움들',
      createdTime: '2023-03-10',
      tags: ['projects', 'portfolio', '블로그'],
      description:
        '블로그를 만들면서, 마주쳤던 여러 기술적인 난제들에 대해 알아보고, 어떻게 해결하고자 시도했는지 기록해 보았다.',
      url: '블로그를 만들면서 마주친 어려움들',
    },
    {
      title: '블로그 이주하기 - 자체 서비스를 만들기 위한 첫 걸음',
      createdTime: '2023-03-04',
      tags: ['projects', 'portfolio', '블로그'],
      description:
        '기존에 사용하던 블로그 서비스인 velog를 더 이상 사용하지 않기로 했다. 기존에 사용하던 velog 플랫폼은 충분히 좋은 플랫폼이지만, 평 소에 글을 작성하는 패턴과 맞지 않는 부분이 있어서 이주를 결심했다.',
      url: '블로그 이주하기 - 자체 서비스를 만들기 위한 첫 걸음',
    },
    {
      title: '기존 프로젝트 리팩토링기',
      createdTime: '2023-01-05',
      tags: ['refactoring', 'projects'],
      description:
        '기존의 팀 단위로 진행했던 프로젝트에 대해 리팩토링을 하기로 결정했다. 리팩토링을 결심한 이유는, 기존에 시간 부족으로 인하여 하나 의 페이지에 탑다운 형식으로 모든 로직과 컴포넌트를 때려넣었기 때문에, 심리적으로 매우 불편한 감정을 느꼈기 때문이다.',
      url: '기존 프로젝트 리팩토링기',
    },
    {
      title: '프로젝트 테스트 커버리지 끌어 올리기',
      createdTime: '2022-12-27',
      tags: ['refactoring', 'projects', 'test'],
      description:
        '먼저 테스트 코드를 ‘잘’ 작성하기 위해서, 좋은 테스트 코드는 무엇인지, 테스트 코드는 어떻게 작성해야 하는 것인지 찾아보았다. 기존 에 인터넷에서 보았던 테스트 코드를 작성해야 하는 이유를 제외하고, 스스로  테스트 코드를 작성해야 하는 이유를 생각해 보았다.',
      url: '프로젝트 테스트 커버리지 끌어 올리기',
    },
  ];

  test('returns original data when there is no selectedTags or keywords input', () => {
    expect(filterPostsByKeywordsAndTags(posts)).toEqual(posts);
  });

  test('returns appropriate data when selectedTags is in', () => {
    const selectedTags = ['React', 'Next.js', 'frontend'];
    expect(filterPostsByKeywordsAndTags(posts, { selectedTags })).toHaveLength(
      5
    );
  });

  test('returns appropriate data when selectedTags is in', () => {
    const selectedTags = ['aaa', 'bbb', 'ccc'];
    expect(filterPostsByKeywordsAndTags(posts, { selectedTags })).toHaveLength(
      0
    );
  });

  test('returns appropriate data when keyword is in', () => {
    const keywords = 'react';
    expect(filterPostsByKeywordsAndTags(posts, { keywords })).toHaveLength(7);
  });

  test('returns appropriate data when keyword is in', () => {
    const keywords = '프로젝트';
    expect(filterPostsByKeywordsAndTags(posts, { keywords })).toHaveLength(4);
  });

  test('returns appropriate data when keyword is in', () => {
    const keywords = 'aaa';
    expect(filterPostsByKeywordsAndTags(posts, { keywords })).toHaveLength(0);
  });

  test('returns original data when there are selectedTags or keywords input', () => {
    const selectedTags = ['React', 'Next.js', 'frontend'];
    const keywords = 'react';
    expect(
      filterPostsByKeywordsAndTags(posts, { selectedTags, keywords })
    ).toHaveLength(7);
  });

  test('returns original data when there are selectedTags or keywords input', () => {
    const selectedTags = ['aaa', 'bbb', 'ccc'];
    const keywords = 'react';
    expect(
      filterPostsByKeywordsAndTags(posts, { selectedTags, keywords })
    ).toHaveLength(7);
  });

  test('returns original data when there are selectedTags or keywords input', () => {
    const selectedTags = ['React', 'Next.js', 'frontend'];
    const keywords = 'aaa';
    expect(
      filterPostsByKeywordsAndTags(posts, { selectedTags, keywords })
    ).toHaveLength(0);
  });
});

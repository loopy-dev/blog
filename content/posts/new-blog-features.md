---
title: 백엔드 없이 블로그 추가 기능 구현하기(feat. 댓글과 조회수기능, 추천 포스트)
createdTime: 2023-05-19
tags:
  - projects
  - React
  - Next.js
  - frontend
description: 블로그 추가 기능들을 구현해보자. 백엔드 없이!
series: b67c675a-e8fc-47d7-8b3a-44ed363d8956
---

# 개요

블로그 기능을 고도화 하기 위한 추가 기능들을 구현했다. 자체적인 백엔드가 없고 firebase를 제한적으로나마 사용할 수 있으나, 무료 요금제 특성상 읽기와 쓰기 횟수가 너무나 적기 때문에 무료로 사용할 수 있는 서비스를 최대한 활용하여 구현하기로 했다.

# 댓글 기능

댓글 기능은 이미 무료로 사용할 수 있는 기능들이 너무나도 많았기 때문에 구현하기 쉬웠다. 물론 firebase를 기반으로 하여 자체적으로 댓글 시스템을 구현할 수도 있었겠지만, 마크 다운 문법의 지원과 github의 활동과 연계가 되는 github 기반의 댓글 서비스를 사용하기로 했다. 그 외에도 사용할 수 있는 무료 플랫폼은 다음과 같다.

## disqus

외부 댓글 서비스에서 인지도가 높은 서비스 중 하나이다. 무료 플랜과 유료 플랜으로 나누어져있다. 무료 플랜도 개인 블로그에서 사용하는 것은 충분하지만, 광고가 붙는다. 개인적으로 블로그에 외부 광고가 붙는 것을 좋아하지 않기 때문에(조화롭지 않은 광고는 글의 몰입도를 떨어트린다고 생각한다.) disqus를 선택하지 않기로 했다.

## utterances

utterances는 오픈 소스 댓글 서비스이다. GitHub 리포지토리에 댓글 시스템을 쉽게 추가할 수 있는 기능을 제공한다. utterances는 GitHub Issues를 기반으로 동작하며, 댓글을 작성하고 관리하기 위해 GitHub 계정이 필요하다. GitHub API를 사용하여 댓글을 가져오고 작성할 수 있으며, 리포지토리에 댓글을 달 수 있는 인터페이스를 제공한다.

이 서비스는 웹사이트, 블로그, 문서 페이지 등 다양한 온라인 콘텐츠에 댓글 시스템을 추가하고자 할 때 유용하다. 사용자들은 GitHub 계정을 통해 로그인하여 댓글을 작성하고, 이슈 트래커를 통해 댓글을 관리할 수 있다. 또한, utterances는 Markdown 형식을 지원하므로 포맷팅된 댓글을 작성할 수 있다.

대부분의 개발자들은 Github 계정을 가지고 있고, 누구보다도 Github 활용법에 대해 익숙한 사람들일 것이며, 이 블로그는 기술 블로그를 지향하기 때문에 utterances 서비스를 사용하는 것이 적합하다고 생각하여 이 서비스를 사용했다. 또한 이 서비스는 무료이고 광고가 붙지 않는다.

### 등록하기

utterances를 등록하는 방법은 매우 간단하다. [utterances 홈페이지](https://utteranc.es/)에서 소개해 준 대로 등록만 하면 끝난다. github 등록도 알아서 해준다.

next.js로 만들어진 이 블로그는 다음과 같이 컴포넌트를 구성했다.

```tsx
// Comments.tsx
import { useEffect, useRef } from 'react';

const Comments = () => {
  const commentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const $script = document.createElement('script');
    $script.async = true;
    $script.crossOrigin = 'anonymous';
    $script.setAttribute('src', '<https://utteranc.es/client.js>');
    $script.setAttribute('issue-term', 'pathname');
    $script.setAttribute('label', 'Comment');
    $script.setAttribute('theme', 'github-light');
    $script.setAttribute('repo', 'mrbartrns/blog');

    commentRef.current?.appendChild($script);
  }, []);
  return <section ref={commentRef} />;
};

export default Comments;
```

## 사이드바에서 댓글 창 꺼내기

기존 댓글은 모바일이든, 데스크톱이든 모두 하단 부분에 댓글 창이 위치하는 단순한 형태였다. 모바일에서는 이런 단순한 형태가 좋지만, 데스크톱은 조금 더 복잡한 레이아웃으로 구성하더라도 괜찮지 않을까 해서 사이드바 형태를 시도하게 되었다. 미디움과 같이 댓글에서 본문 인용 같은 기능은 없지만, 댓글이 많아졌을 때 댓글을 읽어가면서 스크롤을 움직일 수 있는 기능이 너무나도 맘에 들었기 때문에 도입하게 되었다.

만드는 과정은 조금 복잡했으나, 만들고 나서 보니 굉장히 마음에 드는 레이아웃 중 하나이다. 데스크톱 환경에서는 아래쪽에 댓글 아이콘을 클릭하면 댓글 창을 확인할 수 있다.

## 댓글 개수 기능

utterances는 자체적으로 가장 상단에 현재 포스트에서 댓글이 몇 개 존재하는지 알려준다. 그러나 데스크톱 레이아웃에서는 utterances 댓글을 사이드바 내부에 넣어놨기 때문에 해당 섹션이 화면에 보이지 않는 이상, 현재 포스트에서 댓글이 몇 개 달렸는지 알 수 있는 방법이 없다. 따라서 이 부분만 보여줄 수 있는 방법에 대해 검색하게 되었고, 다행히도 답을 찾을 수 있었다.

### Github REST API

GitHub REST API는 GitHub에서 제공하는 REST 기반 api이다. 이 API를 사용하여 GitHub 리포지토리, 이슈, 커밋, 브랜치 등과 같은 GitHub의 다양한 기능과 데이터에 접근할 수 있다. 더 많은 내용은 [Github REST API 공식 문서](https://docs.github.com/ko)를 통해 확인할 수 있다.

이 REST api에서 당연하게도 issue 관련 api가 존재한다(한국어로는 문제라고 되어 있는 것이 웃음벨이다). api response property들을 확인하였고, 댓글 개수에 대한 내용을 확인할 수 있었다.

```tsx
[
  {
    "id": 1,
    "node_id": "MDU6SXNzdWUx",
    "title": "Found a bug",
    "labels": [...],
    "assignee": {...},
    "assignees": [...],
    "milestone": {...},
      "open_issues": 4,
      "closed_issues": 8,
      "created_at": "2011-04-10T20:09:31Z",
      "updated_at": "2014-03-03T18:58:10Z",
      "closed_at": "2013-02-12T13:22:01Z",
      "due_on": "2012-10-09T23:39:01Z"
    },
    "locked": true,
    "active_lock_reason": "too heated",
    "comments": 0, // 이 부분
]
```

issue를 쿼리할 수 있는 방법은 issue 번호를 알아서 바로 해당 이슈에 대한 정보를 가지고 올 수 있는 방법과, 해당 repository의 모든 이슈들을 긁어오는 방법이 있다. 원래대로라면 issue 번호를 파악하여 해당 이슈만 가져오는 것이 가장 이상적인 방법이지만, utterances가 만들어준 issue 번호를 frontend 측에서 파악하는 방법은 없었기 때문에 부득이하게도 모든 이슈를 긁어와 필터링 하는 방법을 사용하였다(가장 맘에 들지 않는 부분 중 하나이다).

또한 직접 REST API를 통해 요청하는 것이 아닌, ocokit이라는 npm 패키지를 제공하기 때문에 해당 패키지를 이용하였다. ockokit은 auth로 github token을 이용하는데, 이 github token이 최근에는 보안상 영구적으로 유효한 토큰을 제공하지 않기 때문에 주기적으로 환경 변수를 바꿔줘야 하는 귀찮음이 존재하게 될 듯 하다.

```tsx
import { Octokit } from 'octokit';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export default octokit;
```

브라우저에서 요청하면 cors에러가 발생하기 때문에 Next.js의 api routes 기능을 사용하여 서버에서 요청을 처리할 수 있도록 하였으며, 모든 이슈 중 title이 현재 url과 일치하는 것, `Comment`라는 라벨이 붙어 있는 것을 찾아서 가져올 수 있도록 하였다.

```tsx
// pages/api/comments/[id].ts

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: title } = req.query;

  const { data } = await octokit.request('GET /.../issues', {
    owner: owner,
    repo: 'REPO',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  const currentIssue = data.find(
    (issue: Issue) =>
      issue.title === `posts/${title}` &&
      issue.labels.find((label: Label) => label.name === 'Comment')
  ) as Issue;

  if (!currentIssue) {
    return res.status(200).json({
      comments: 0,
    });
  }

  return res.status(200).json({
    comments: currentIssue.comments,
  });
};

export default handler;
```

이렇게 해서 댓글 기능이 완성되었다. 빈대 잡으려고 초가 삼간 태우는(?) 느낌이 없지 않아 있지만, 잘 동작하는 것을 보니 아주 뿌듯하다.

![image](https://github.com/mrbartrns/blog/assets/56826914/5d4ab4c1-065a-406f-9b97-801e5db7d3b9)

# 조회수 기능

해당 글을 얼마나 많은 사람들이 조회했는지 조회수 기능을 추가했다. 이 역시 백엔드가 없기 때문에 무료인 외부 api를 이용하였다. 그래서 새로고침 할 때마다 조회수가 증가하는 문제점이 있다.

블로그 ui와 동화될 수 있기를 원했기 때문에 json 형식으로 내려받을 수 있는 api를 원했고, [](https://hits.dwyl.com/)[https://hits.dwyl.com](https://hits.dwyl.com) 서비스가 json 형식으로 데이터를 받을 수 있는 형식을 제공했다. 이 서비스는 원래 repository의 README 파일에다가 사용하는 것을 의도했는지 url을 적을 때도 `user/repo` 형식으로 적으라고 쓰여져 있었으나, 꼭 그렇게 작성해야 한다는 법은 없기 때문에 커스텀하여 각 포스트의 조회수를 확인할 수 있도록 하였다.

그리고 개발하면서 계속 테스트하면서 의미 없이 조회수가 올라가는 것을 방지하기 위하여 개발 환경에서는 400 error를 반환하도록 처리하였다.

마찬가지로 Next.js의 dynamic api routes 기능을 이용하였다.

```tsx
// pages/api/posts/hits/[url].ts

const isDevelopment = process.env.NODE_ENV === 'development';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url: pathname } = req.query;

  if (!pathname) {
    return res.status(400).json({
      message: 'bad request. post url is required.',
    });
  }

  if (isDevelopment) {
    return res.status(400).json({
      message: 'hit is not available on development mode.',
    });
  }

  // custom한 주소
  const url = `https://hits.dwyl.com/${process.env.GITHUB_ID}/${process.env.POST_PREFIX}-${pathname}.json`;

  const response = await axios.get<PostHits>(url);

  return res.status(200).json(response.data);
};

export default handler;
```

```tsx
// Footer.tsx
const Meta = () => {
  useEffect(() => {
    (async () => {
      try {
        const hitsData = await getPostHits(url);
        setHits(formatNumber(Number(hitsData.message)));
      } catch {
        // eslint-disable-next-line no-console
        console.log('hit is not available on development mode.');
      }
    })();
  }, [url]);

  return <div />;
};
```

`formatNumber`라는 함수는 조회수가 1천회가 넘어갈 때 1k, 1백만회가 넘어갈 때 1M 등 간단하게 표현할 수 있도록 구현한 함수이다. 110만회일 때 1.1M 형식으로 나타내야 하며, 해당 함수는 테스트하기가 용이하기 때문에 해당 함수에 대한 테스트 코드를 작성했다.

```tsx
// utils.spec.ts

import { formatNumber } from './utils';

describe('formatNumber', () => {
  test('0 will be formatted to 0', () => {
    expect(formatNumber(0)).toBe('0');
  });

  test('999 will be formatted to 999', () => {
    expect(formatNumber(999)).toBe('999');
  });

  test('1000 will be formatted to 1k', () => {
    expect(formatNumber(1000)).toBe('1k');
  });

  test('1500 will be formatted to 1.5k', () => {
    expect(formatNumber(1500)).toBe('1.5k');
  });

  test('15091 will be formatted to 15k', () => {
    expect(formatNumber(15091)).toBe('15k');
  });

  test('999999 will be formatted to 999.9k', () => {
    expect(formatNumber(999999)).toBe('999.9k');
  });

  test('9999999 will be formatted to 9.9M', () => {
    expect(formatNumber(9999999)).toBe('9.9M');
  });

  test('9999999999 will be formatted to 9.9B', () => {
    expect(formatNumber(9999999999)).toBe('9.9B');
  });
});
```

굿굿~

# 글을 마치며

현재까지 백엔드 없이 불가능할 것이라 생각했던 기능들을 보다 간단하게 구현할 수 있어서 뿌듯하다. 또한 테스트 코드까지 야무지게 작성할 수 있었던 좋은 경험이 되었다.

앞으로 블로그의 기능들을 계속 고도화 하면서 더 어려운 부분들에 대해 도전해나갈 생각이다.

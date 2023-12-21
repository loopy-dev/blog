---
title: 블로그 이주하기 - 자체 서비스를 만들기 위한 첫 걸음
createdTime: 2023-03-04
tags:
  - projects
  - portfolio
  - 블로그
description: 기존에 사용하던 블로그 서비스인 velog를 더 이상 사용하지 않기로 했다. 기존에 사용하던 velog 플랫폼은 충분히 좋은 플랫폼이지만, 평소에 글을 작성하는 패턴과 맞지 않는 부분이 있어서 이주를 결심했다.
series: b67c675a-e8fc-47d7-8b3a-44ed363d8956
---

## 개요

기존에 사용하던 블로그 서비스인 [velog](https://velog.io)를 더 이상 사용하지 않기로 했다. 기존에 사용하던 velog 플랫폼은 충분히 좋은 플랫폼이지만, 평소에 글을 작성하는 패턴과 맞지 않는 부분이 있어서 이주를 결심했다.

## 무엇이 문제였는가

> 우선 기존에 글을 작성하는 방식은 다음과 같다.

1. 우선 [Notion](https://www.notion.so)에서 초안을 작성한다.
   1. 노션으로 초안을 작성하는 이유는, velog 같은 경우는 마크 다운 문법으로 모든 글을 작성하는데, 이 부분이 다소 귀찮았다. 반면에 노션같은 경우는 `-` 입력 시 자동으로 리스트를 만들어주거나, 블럭 단위 커스터마이징이 다소 용이했기 때문이다.
2. Notion에 작성한 내용을 복사하여 그대로 velog에 복사한다.

이렇게 작성하는 이유는, velog에도 임시 저장 기능이 있긴 하지만, 임시 저장 기능을 생각보다 잘 사용하지 않았고, 다시 손이 가지 않았다. 반면에 notion 같은 경우는 수정이 간편하고 글을 쓰는 즉시 저장이 되므로 개인적으로 훨씬 자주 찾게 되었다.
또한 velog에 작성한 글은 비공개가 불가능하고, 삭제만 가능하다는 문제점도 있다.

노션 플랫폼은 표준 마크다운 문법을 완벽히 준수하지 않으므로, 노션에서 작성한 글을 velog에 복사하면 보이는 그대로 출력되지 않는다는 문제점이 있다.

> 두번째로, velog의 버그인데, github 소셜 로그인을 하게 되면 댓글 알림을 등록할 수 없다.

이메일을 통해 가입하게 되면 누군가가 댓글을 작성할 경우 이메일을 통해 알림을 받을 수 있으나, github 소셜 로그인을 이용하면 알림을 받을 이메일을 등록하는 칸이 비활성화되어 이 기능을 사용할 수 없다. 또한 게시글 자체 통계를 이용할 수 있으나 다른 부분에서 통계적인 분석을 사용할 수 없는 아쉬움도 있었다.

> 마지막으로, 디자인 커스터마이징이 아쉽다.

개인적인 이유이지만, velog의 글자 크기는 나에게 있어서 다소 크다.

## 자체 블로그 서비스가 갖춰야 할 것들

이제 기존 이용하던 블로그 서비스에 대한 문제점은 충분히 찾았다. 그러면 새로 블로그를 만든다면, 어떤 기능이 있으면 좋을지 생각해보자.

- (블로그 서비스로 당연하지만) 검색 엔진 최적화
- 댓글 알림 기능
- **노션에 작성한 글을 그대로 보여주기**
  - 또한, 공개 여부를 직접 선택할 수 있어서 다른 사용자에게 보여줄 수 있는 기능이 있어야 함
- 통계 기능 -> 기존 서비스에서는 게시글 조회수만 검색할 수 있었으나, 좀 더 다양한 환경에서의 통계 자료가 필요함

그래서, Notion에서 제공하는 [Notion API](https://developers.notion.com/)를 이용하여 블로그를 만들기로 했다.

1. Notion api를 통해 작성한 글들을 불러온다.
2. 공개 여부는 등록한 property인 `published` 가 체크 되어 있는 것들만 불러오는 것으로 해결한다.
3. 불러온 글은 markdown 형식으로 변환하여 다른 외적인 부분에 대해 신경 쓸 필요가 없도록 한다.
4. 태그 기능 및 pagination을 제공한다.
5. 댓글 기능은 github의 comment 기능을 이용한다.
6. RSS 기능을 통한 구독 서비스를 제공한다.

이 정도 기능을 우선 생각하고, 개발을 시작하였다. 물론 1번부터 제대로 진행되지 않았는데, 이 이야기는 바로 다음에 작성한다.

## 노션 api로 블로그 개발하기

### 노션 api 연결

우선 노션 api를 간단하게 연결해 보았다.

1. 노션 클라이언트를 연결한다. 노션 api 키는 [Notion API](https://developers.notion.com/) 에서 받을 수 있다.

```tsx
// notion.ts
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY,
});

export default notion;
```

2. 노션 api를 통해 데이터베이스를 테스트한다. 그 전에 notion에서 데이터베이스를 api키와 통합하는 과정을 거쳐야한다. 연결은 노션의 가장 오른쪽 위쪽의 ...을 클릭하여 아래쪽의 `연결`을 클릭하여 공개할 수 있다.
   ![image](https://user-images.githubusercontent.com/56826914/222960552-3f17e345-062f-4b12-9e19-0c80a03b34b1.png)
3. 검색 api를 통해 데이터베이스 리스트를 불러온다.

```tsx
// pages/api/posts/index.ts

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import notion from '../../notion';
import type { NextApiRequest, NextApiResponse } from 'next';

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
const apiKey = process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!databaseId || !apiKey)
      throw new Error('Missing notion api key or DB id.');

    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return res.status(200).json(results);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;
```

```tsx
import { useEffect } from 'react';
import getPosts from '../../api/posts';

const Page = () => {
  useEffect(() => {
    (async () => {
      try {
        const response = await getPosts();

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  return <div />;
};

export default Page;
```

```text
[
    {
        "object": "page",
        "cover": null,
        "createdBy": {
            "object": "user",
            "id": ...
        },
        "createdTime": ...,
        "archived": false,
        "icon": null,
        "id": ...,
        "title": ...,
        "description": ...,
        "lastEditedTime": ...
    },
]
```

검색 결과 데이터베이스에 있는 페이지들이 잘 노출되는 것이 확인된다.

### 페이지 내부 컨텐츠를 출력

페이지 내부의 데이터를 가져와야만 블로그 포스트를 만들 수 있다. 그렇지만 Notion api는 데이터 베이스를 쿼리하는 기능, 페이지 단위로 데이터를 찾는 api가 있지만 노션 자체가 블록 데이터로 이루어져 있기 때문에 블로그 글로 표현하기 위해서는 추가적인 변환 (블록 단위 데이터를 마크 다운 형식으로 변환)하는 작업이 필요하다.

모든 블록들을 찾고 이를 마크다운으로 변환하는 과정은 `notion-to-md`라는 라이브러리를 이용하여 변환하는 과정을 거쳤다. 그리고 마크다운을 출력하는 과정은 `react-markdown` 라이브러리를 이용했다.

![server_test](https://user-images.githubusercontent.com/56826914/223120697-a73d9d7a-28b9-4143-b933-f38df112b5b8.gif)

화면에 제대로 출력되는 것을 확인할 수 있다.

### 문제점

동작은 제대로 되고 있으나, 다소 치명적인 문제점을 확인할 수 있었다.
마크다운 텍스트를 변환하는 작업을 next.js의 `pages/api`를 통해 클라이언트 사이드 렌더링으로 개발을 진행했다.
그러나 notion api의 문제인지, 응답 속도가 빠를 때는 빠르게 컨텐츠를 표시할 수 있었으나 그렇지 못할 경우 매우 오랜 시간동안 흰 화면만 나타나는 문제가 있다.
또한 로딩 중에 스켈레톤이 적용되도록 설정했는데, 동작 화면을 보면 알 수 있듯이 스켈레톤이 적용되지 않는 문제가 있었다. 이는 데이터를 불러왔으나 이를 마크다운으로 표시하는데 많은 시간이 소요됨을 뜻하는 것 같았다.
노션에서 작성한 글과 실시간으로 연동되는 부분은 좋았으나, 평균 속도가 너무 느렸기 때문에 이대로 내보내기에는 부족함이 많았다. 따라서 다른 방법을 생각해야 했다.

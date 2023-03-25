---
title: 왜 그 때는 몰랐을까, Next.js의 편리함을
createdTime: 2023-03-25
tags:
    - projects
    - React
    - Next.js
    - frontend
description: Next.js를 이번 프로젝트에 본격적으로 사용하면서 여러 편리한 기능들을 사용하면서 느낀점과 기존 React에서는 어떻게 같은 기능을 구현했었는지 비교하는 시간을 가졌다.
---

# 개요

이전에는 주로 `create-react-app`이나 자체적으로 만들어 두었던 [React-typescript-boilerplate](https://github.com/mrbartrns/react-typescript-boilerplate) 를 이용하여 리액트 환경을 직접 구성하여 프로젝트를 진행했다. 잘 만들어진 다른 프레임워크(Next, gatsby)들을 사용하지 않고 말이다.

사용하지 않은 이유는 여러 이유들이 존재하지만, 이전 팀 프로젝트를 Nextjs에 대해서 제대로 알지 못하고, 단순히 경험삼아 사용해 보고싶다는 이유로 해당 프레임워크를 사용했는데, 덕분에 팀원과 함께 개발하면서 많은 오류를 경험하여 다시 건드리는 것이 무서웠던 이유가 컸다.

예를 들면, 기존에 react에서 클라이언트 사이드에서 데이터 저장이 필요할 때, localStorage를 주로 사용했었고 어디에서나 접근이 가능했다.

```tsx
const ReactComponent = () => {
  const [value, setValue] = useState(() => {
    return window.localStorage.getItem('key') || ''
  }) // 가능

  return (
    <h1>{value}</h1>
  )
}
```

그러나 Nextjs의 경우 서버 사이드 렌더링이기 때문에, 렌더 단계에서 스토리지에 접근하여 처리하는 것이 불가능하며, 오직 `useEffect` hook을 통해 localStorage 값에 접근할 수 있다.

```tsx
const NextComponent = () => {
  const [value, setValue] = useState('');
  
  // 컴포넌트가 서버사이드에서 렌더링된 뒤, 클라이언트에서 동작하는 useEffect에서 localStorage 접근 가능
  // 서버사이드에서 window 객체는 undefined이다.
  useEffect(() => {
    setValue(() => window.localStorage.getItem('key') || '')
  }, [])
  
  // mount 후 useEffect hook 실행으로 인해 찰나의 시간에 데이터가 변하는 현상 발생
  return (
    {value && <h1>{value}</h1>}
  )
}
```

이런 동작 방식 상의 차이를 이해하지 못하고 React에서 사용하던 방식 그대로 개발을 진행했었기 때문에 트러블 슈팅에 많은 시간을 투자할 수밖에 없었다.

# React와는 약간 다른 Next.js의 동작 방식

> 틀린 내용이 있을 수 있습니다.

Nextjs는 React 기반이지만, 일반 React가 클라이언트 사이드에서만 동작하는 것과 달리 서버, 클라이언트 모두 다룰 수 있는 풀스택 프레임워크이다. 이를 보다 깊게 이해하기 위해서는 우선 클라이언트 사이드 렌더링과 서버 사이드 렌더링에 대한 이해가 필요하다.

## 클라이언트 사이드 렌더링(CSR)

<aside> 📌 클라이언트 사이드 렌더링은, 브라우저가 렌더링의 주체로서 렌더링 과정을 실행하는 것을 뜻한다.

</aside>

![클라이언트 사이드 렌더링 동작 과정](https://d2.naver.com/content/images/2020/06/csr.png)

클라이언트 사이드 렌더링 동작 과정

클라이언트가 서버에 요청하면, 서버는 응답하여 페이지 렌더링에 필요한 html 템플릿과 페이지 렌더링에 필요한 자바스크립트 파일을 클라이언트에 전송한다. 그리고 브라우저는 서버로부터 받은 빈 html 템플릿과 자바스크립트를 바탕으로 DOM을 렌더링한다.

클라이언트 사이드 렌더링은 몇 가지 특징을 가지고 있다.

1.  서버 사이드 렌더링 방식이 페이지 이동에 따라 새로운 html 템플릿을 요청하기 때문에 새로고침(깜빡 현상)이 발생하는 것과 달리, 클라이언트 사이드 렌더링은 자바스크립트를 이용하여 페이지를 동적으로 그려낼 수 있으므로 깜빡임 현상 없이 페이지를 이동시킬 수 있다(실제로 history api를 이용하여 url을 변경하고 history에 저장하지만, 실제로 페이지를 서버에 요청하지 않고 url에 맞게 자바스크립트를 실행한다).
2.  모든 페이지 렌더링에 필요한(따로 코드 스플리팅을 진행하지 않았다면) 자바스크립트 파일을 초기 로딩시 받아 실행하므로 FCP(First Contentful Paint)는 서버 사이드 렌더링보다 느리다. 단, 페이지가 완전히 로딩되는데 걸리는 시간은 서버 사이드 렌더링보다 빠르다.

## 서버 사이드 렌더링

<aside> 📌 서버 사이드 렌더링은 렌더링 주체가 서버가 되어, 서버에서 템플릿을 렌더링한 뒤 클라이언트에 전달하는 방식이다.

</aside>

![서버 사이드 렌더링 동작 과정](https://d2.naver.com/content/images/2020/06/ssr.png)

서버 사이드 렌더링 동작 과정

클라이언트가 서버에 요청하면, 서버는 데이터를 바탕으로 html 템플릿을 그린 뒤 클라이언트에 전송하고, 클라이언트는 채워진 html 템플릿과 상호작용을 위한 자바스크립트 파일을 실행한다.

서버 사이드 렌더링은 다음과 같은 특징이 있다.

1.  서버가 렌더링을 담당하기 때문에 클라이언트 사이드 렌더링과 달리 html 템플릿에 정보가 존재하는 상태이므로, 사용자는 클라이언트 사이드 렌더링보다 빠르게 데이터를 확인할 수 있다.
2.  다만 상호작용이 준비되기 까지 걸리는 시간(완전히 로딩되는 시간)은 클라이언트 사이드 렌더링 방식보다 느리다.

클라이언트 사이드 렌더링 방식과 서버 사이드 렌더링 방식은 이와 같이 장점과 단점이 명확하게 반대됨을 알 수 있다. 따라서 두 렌더링 방식의 장점을 취하기 위한 방법을 찾기 시작했고, 그 중 하나가 Next.js의 방식이다.

## Next.js의 렌더링 방식

### 초기 로딩 시(SSR)

1.  Next.js는 React와 달리 서버에서 웹 페이지를 프리렌더링하여 클라이언트로 전송한다.
2.  클라이언트는 html 템플릿을 받았지만, 웹 화면만 구성되어 있을 뿐, 어떠한 자바스크립트 요소들도 없는 상태이다. 이는 단순 클릭과 같은 이벤트들도 DOM에 연결되어 있지 않은 상태임을 뜻한다.
3.  클라이언트 사이드에서 hydration을 진행한다. hydrate는 `ReactDOMServer`를 이용하여 렌더링 된 html에 이벤트 리스너를 연결시켜주기 위해 사용된다.

여기까지가 Next.js의 프리렌더링 단계이다. 프리렌더링은 SSG(Static Site Generation, 프리 렌더링을 정적으로 진행, 빌드 단계에서 페이지 생성) 또는 SSR(Server Side Rendering, 프리 렌더링을 동적으로 진행, 서버에서 데이터 페칭) 두 종류가 있지만, 이 글에서는 여기까지만 알아보는 걸로..

### 페이지 이동 시(CSR)

페이지 이동 시, Next.js는 클라이언트 사이드 렌더링 방식을 통해 서버를 거치지 않고 클라이언트 사이드에서 렌더링을 진행한다. (`next/link`을 이용하여 페이지 이동 시)

> 즉, Next.js는 서버 사이드 렌더링의 장점과 클라이언트 사이드 렌더링의 장점을 어느 정도 절충한다.

그래서 React와 동일한 방식으로 `window.localStorage`에 접근하면 에러가 발생하는 이유는, 서버에서 프리렌더링을 진행하기 때문임을 알 수 있다.

# 편했던 점들

이번 블로그를 Next.js를 이용하여 만들면서, 기존에 React만을 사용했을 때 느끼지 못했던 점들을 간단하게 기록해 보고자 한다. 사실 이 부분이 메인인데 서론이 너무 길어졌다. SEO 같이 서버 사이드 렌더링, 정적 프레임워크가 지원하는 특성 부분에 대해서는 일단 제외하고, 실제 사용하면서 느꼈던 Next.js 만의 편의성에 대해서만 적어보도록 하겠다.

## 페이지 라우팅 지원

이 기능은 [우리맵 프로젝트](https://github.com/mrbartrns/woorimap)에서 너무나 잘 사용했던 기능이자, Next.js의 가장 대표적인 특징이라고 생각하는 부분이다.

React 프로젝트에서 라우팅 처리를 위해 `react-router-dom`을 이용했다.

```tsx
import { Routes, Route } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route element={<NotFoundPage />} path="/404" />
      <Route
        path="/"
        element={<MainPage />}
      />
      <Route element={<PostDetailPage />} path="/posts/:id" />
  </Routes>
  )
}
```

그리고 동적 라우팅을 위해 `PostDetailPage`에서는 `useParams`를 통해 `id`에 접근할 수 있다.

```tsx
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();

  // ...
}

export default PostDetailPage
```

반면에 Next.js에서는 단순히 `pages` 폴더에 일정 규칙으로 파일명을 명명하기만 한다면, url에 따라 자동으로 라우팅을 처리해준다.

```text
// pages 폴더 내부의 파일들은 일정 규칙에 맞게끔 파일명을 작성해야 한다.
pages
┣ api
┃ ┗ hello.ts
┣ feedback
┃ ┗ index.tsx
┣ posts
┃ ┣ index.tsx
┃ ┗ [id].tsx
┣ index.tsx
┣ _app.tsx
┗ _document.tsx
```

-   `pages` 폴더의 `index.tsx`는, 사용자가 `/` 경로를 요청했을 때 보여줄 컴포넌트가 된다. 마찬가지로 `/posts` 를 사용자가 요청하면, `posts/index.tsx` 내용이 사용자에게 보여지게 된다.
-   `[id].tsx`규칙을 통해 dynamic routing이 가능하다. dynamic routing은, `/posts/abc` 등 동적으로 하위 데이터를 불러와야 하는 경우에 유용하다.
-   다음과 같이 컴포넌트 내에서 `useRouter`를 통해 접근이 가능하다.

```tsx
// 파일 이름이 [pid].tsx 라면 router.query.pid 값에 접근할 수 있다.
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post
```

```tsx
// pages/api 폴더 파일들은 서버사이드에서 동작하여 api endpoint를 제공한다.
// verify.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CaptchaResponse } from '~models/Feedback';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { captcha } = req.body;

    if (req.method !== 'POST') {
      return res
        .status(400)
        .json({ message: 'handler only allows POST method.' });
    }

    if (!captcha) {
      return res.status(400).json({
        message: 'Unproccesable request, please provide the required fields.',
      });
    }

    const captchaResponse = await fetch(
      '<https://www.google.com/recaptcha/api/siteverify>',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
      }
    ).then((response) => response.json() as Promise<CaptchaResponse>);

    if (captchaResponse.success) {
      return res.status(200).json(captchaResponse);
    }

    return res
      .status(400)
      .json({ message: 'Unproccesable request, invalid captcha code.' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'bad request.' });
  }
};

export default handler;
```

클라이언트에서는 간단하게 `api/verify` 경로를 요청하여 원하는 동작을 수행할 수 있다.

## 그 외 다양한 최적화 기술들(폰트 최적화)

Next.js는 폰트, css 프리로드 등 다양한 기능들을 Next.js의 api를 이용하여 간단하게 구현할 수 있다.

웹 사이트를 방문하면 필요한 자원을 서버에 요청할 때 서버는 요청 순서와 관계 없이 준비가 완료 되는데로 응답하게 된다.

빠르게 로딩시킬 파일을 preload설정하게 되면, 우선적으로 해당 파일을 로드할 수 있다.
일반적으로 폰트 파일의 크기들이 크기 때문에 로드하는 데 시간이 오래 걸리고, 페이지가 로드된 뒤 폰트가 적용되어 layout shift가 발생하기 쉬우며, 이는 사용자 경험에 부정적인 영향을 끼칠 수 있다.

next.js의 폰트 최적화 기능을 사용하면, 리소스가 큰 폰트 파일을 프리로드하여 layout shift를 최소화할 수 있다. 구글 폰트 같은 경우 이미 api화 되어있으며, 개발자가 원하는 폰트를 local에 저장하여 최적화가 가능하다.

```tsx
// font.ts
import localFont from '@next/font/local';

// font optimization
export const Pretendard = localFont({
  src: [
    {
      path: './Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: './Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './Pretendard-Bold.woff',
      weight: '700',
    },
  ],
});

// _app.tsx
import { Pretendard } from './font.ts';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={Pretendard.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
```

폰트 최적화 적용 후 브라우저에서 결과는 다음과 같다.

![https://user-images.githubusercontent.com/56826914/227710196-c25d83fc-7ebd-4351-a00d-06f9344d6906.png](https://user-images.githubusercontent.com/56826914/227710196-c25d83fc-7ebd-4351-a00d-06f9344d6906.png)

# 마치며

이번 블로그를 만들면서 여러 Next.js가 제공하는 편의성을 사용하면서 느꼈던 점을 간단하게 적어보았다. 그렇지만 아직 사용하지 못했던 편리한 기능들도 많다. 예를 들면 middleware 처리 같은 부분 말이다. 계속 블로그를 고도화 하면서, 기회가 있다면 적극적으로 사용해 보려고 한다.

# 출처

[어서 와, SSR은 처음이지? - 도입 편](https://d2.naver.com/helloworld/7804182)
[[Next.js] SSG, SSR 개념 정리](https://narup.tistory.com/235)
[Next.js의 렌더링 과정(Hydrate) 알아보기](https://www.howdy-mj.me/next/hydrate)
[API Routes: Introduction | Next.js](https://nextjs.org/docs/api-routes/introduction)
[CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/#cors%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%8F%99%EC%9E%91%ED%95%98%EB%82%98%EC%9A%94)
[Advanced Features: Middleware | Next.js](https://nextjs.org/docs/advanced-features/middleware)
[Next.js - middleware 사용하기 (로그인 연동하기)](https://junheedot.tistory.com/entry/Nextjs-middleware-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0)
[Preload의 개념, 그리고 올바른 사용법](https://helloinyong.tistory.com/319)
---
title: 블로그를 만들면서 마주친 어려움들
createdTime: 2023-03-10
tags:
  - projects
  - portfolio
  - 블로그
description: 블로그를 만들면서, 마주쳤던 여러 기술적인 난제들에 대해 알아보고, 어떻게 해결하고자 시도했는지 기록해 보았다.
series: b67c675a-e8fc-47d7-8b3a-44ed363d8956
---

## 개요

블로그를 만드는 과정이 쉽지 않았다. 단순히 데이터를 보여주는 부분에 있어서 본다면 동작은 했으나, 기존에 사용하던 서비스 대비 갖는 장점을 찾기가 쉽지 않았다. 대부분의 문제는 성능에서 많이 나타났고 따라서 이 부분을 해결해야만 정상적으로 서비스를 운영할 수 있다고 생각하여 이 부분을 우선 시도하게 되었다. 그 과정에서 만났던 여러 기술적인 어려움들을 기록하였다. 블로그를 개발하면서 만난 기술적인 어려움들은 다음과 같다.

## 너무 느린 요청 속도

처음 개발 의도는 `notion api`를 이용하여 노션에 글을 작성하면 실시간으로 블로그에 보일 수 있게 만드는 것이었다. 그러나 실제로 api를 연결하고 테스트 해보니 요청 소요 시간이 너무나 오래 걸리기 때문에 notion 기반의 블로그를 만드는 것에 어려움이 있었다.

<figure>
<img width="424" alt="t1" src="https://user-images.githubusercontent.com/56826914/224198298-1b40dacb-9e40-4bc4-a87d-c156a978ef42.png">
<figcaption align="center">거의 7초에 가까운 요청 시간이 걸리는 것을 알 수 있다.</figcaption>
</figure>

1. `/api/post/[id]`를 통해 리소스를 요청한다.
2. `notion-to-md`를 이용하여 페이지 번호를 통해 모든 블록들을 받아온다. 그리고 이것을 마크다운 텍스트로 변환한다.
3. 페이지 메타데이터 역시 함께 요청하여 클라이언트로 전송한다.

> 기본적으로 notion api로 요청하는 것이 오래 걸림 뿐만 아니라, 정보들이 블록 단위로 되어 있어 이를 마크다운 형식으로 변환하는데 걸리는 시간이 합해져 너무나 많은 시간이 걸렸다.

## 해결 방식

이를 해결하기 위하여 조금 극단적인 방식을 사용했다. 노션 기반의 블로그를 서비스하는 것을 포기하고, 마크다운 텍스트 기반의 정적 블로그로 개발 방향을 바꿨다.
api 요청 시간이 너무 오래 걸리고, 블로그 seo를 최적화 하기 위해 서버 사이드 렌더링 방식으로 렌더링을 진행했었다.
그러나 `getServersideProps`의 요청이 완료되기 전까지 페이지가 그대로 멈춰있는 현상이 발생했기 때문에 유저의 이탈률이 더 높아질 것이라고 생각했다. 그래서 변경한 개발 방향은 다음과 같다.

1. `content` 폴더에 마크다운으로 작성한 포스트를 넣는다.
2. `getStaticPaths`를 이용하여 작성한 포스트들로부터 경로를 구성한다.
3. `getStaticProps`를 이용하여 경로로부터 마크다운 포스트를 불러온다.

SSG 렌더링 방식은 SSR 방식과 달리 요청 시 서버로부터 데이터를 불러오는 방식이 아닌, 빌드 시 페이지를 미리 생성해두고 요청 시 빌드 시 만들어두었던 페이지를 보여주는 방식이다.

- 이 방식은 재 빌드시 까지 페이지의 내용이 변경되지 않기 때문에 자주 변경되는 내용이 있을 경우 적합하지 않다.
- 그러나 한 번 만들어두면 서버 사이드 렌더링 처럼 서버 요청을 통해 데이터를 불러오지 않기 때문에 매우 빠른 속도로 페이지 렌더링이 가능하다. 또한 SEO 측면에서 장점도 있다

블로그 포스트의 경우 실시간으로 변경이 필요한 부분은 아니라고 생각하였고, SEO 측면과 유저 이탈률 측면에서 보다 빠르게 페이지를 렌더링 하는 것이 더 중요하다고 생각하여 개발 방향을 변경하게 되었다. 실제로 SSG 형식으로 마크 다운 페이지를 렌더링 방식을 변경한 후에 네트워크 요청 속도가 약 50% 감소하였다. 이유는 우선 notion api를 거치지 않고, 블록 데이터를 마크다운으로 변환하는 과정 없이 마크다운 문자열을 바로 변환하기 때문에 시간을 단축 시킬 수 있었던 것으로 보인다.

<figure>
<img width="425" alt="network_after" src="https://user-images.githubusercontent.com/56826914/224209249-af852135-df88-4bd3-9fb5-7952ec3dd1a0.png">
<figcaption align="center">필요한 모든 요청이 1초대에 끝나는 모습을 확인할 수 있다.</figcaption>
</figure>

네트워크 요청 속도를 엄청나게 단축시켰지만, 기존에 노션으로 글을 작성하고 이를 바로 블로그에 보여주게 하려는 의도는 달성하지는 못했다. 추후 네트워크 캐싱 등을 활용해서, 기존의 기획 의도를 달성시킬 수 있도록 노력해 봐야겠다.

현재는 `obsidian`이라는 앱을 이용하여 마크다운으로 포스트를 작성하고 있다. notion 기반으로 자동으로 하위 마크다운을 만들어줄 뿐만 아니라 로컬에 저장도 가능하여 오히려 더 좋은 앱을 발견하여 글 쓰는 재미가 늘었다.

## 너무 낮은 성능 지수

notion api 기반에서 정적 마크다운 파일 기반의 블로그로 개발 방향을 선회했지만, 그럼에도 불구하고 성능 지수가 너무 낮았다. 실제 눈으로 봤을 때는 빠르게 보였음에도 불구하고 lighthouse 점수는 60점대를 벗어나지 못했다. 렌더링 관련한 이슈는 유저의 이탈률에도 큰 영향을 미치기 때문에, 이 부분을 제대로 해결해보자고 생각했다.

우선 기존 게시글 보여주는 페이지의 lighthouse 점수는 다음과 같다.

<img width="414" alt="post_r_lighthouse_before" src="https://user-images.githubusercontent.com/56826914/224229892-24e5371b-0f2f-40d0-b9ed-eed30b41e53e.png">

특히 `Time to Interactive` 점수와 `Total Blocking Time`, `Cumulative Layout Shift` 점수가 다른 부분에 비해 치명적임을 알 수 있다.

## 해결하기 전에

라이트하우스는 세부적인 진단 결과를 개발자들에게 알려주어, 이대로만 개선하더라도 꽤나 좋은 점수를 받을 수 있다. 따라서 이 부분을 우선 해결해 보도록 하자. 물론 각 항목이 어떤 역할을 하는지는 알아둘 필요가 있다. [이 글](https://medium.com/jung-han/%EB%9D%BC%EC%9D%B4%ED%8A%B8%ED%95%98%EC%9A%B0%EC%8A%A4-%EC%84%B1%EB%8A%A5-%EC%A7%80%ED%91%9C-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-83df3dc96fb9)이 성능을 개선하는데 많은 도움이 되었다.

### First Contentful Paint

뷰 포트 내에 의미있는 컨텐츠가 처음 화면에 렌더링 될 때까지의 시간을 측정한다. 라이트 하우스 점수에서 차지하는 비중은 15%이다.

### Speed Index

뷰 포트 내에 컨텐츠가 눈에 띄게 채워지는 속도. 낮을 수록 좋은 지표를 나타내며 라이트 하우스 점수에서 차지하는 비중은 15%이다.

### Largest Contentful Paint

뷰 포트 내에서 가장 큰 영역을 차지하는 이미지 또는 텍스트 요소(블록 레벨 요소)가 렌더링되는데 걸리는 시간을 말한다. 측정은 모든 요소에 대해서 측정하는 것이 아닌, `<img>`, `<video>`, `텍스트 요소를 포함하는 블록 레벨 요소`에 대해서 측정한다. 라이트 하우스 점수에서 차지하는 비중은 25%로 큰 비중을 차지한다.

### Time to Interactive

완전히 사용자와 상호 작용할 수 있는 상태가 되는데 걸리는 시간을 말한다. 라이트 하우스 점수에서 차지하는 비중은 25%이다.

이 부분은 라이트하우스 진단 쪽에서 따로 카테고리가 나누어져있지 않아 찾아보았는데, 메인 스레드에서 작업이 진행 중이라면 사용자는 페이지가 로드 되었으나 클릭 또는 입력이 불가능하다.

Long task는 50ms를 기준으로 잡아 이 보다 오래 걸린다면 long task로 분류할 수 있다.

1. quiet window(long task가 존재하지 않고 진행 중인 GET 요청이 두 개 이상 존재하지 않음)가 적어도 5초 이상 지속되는 부분을 찾는다.
2. Long task가 더 이상 존재하지 않으면 quiet window 이전의 long task를 찾고, long task가 종료된 시점이 TTI가 된다.

### Total Blocking Time

사용자와 상호작용 하지 못한 시간의 총 합을 측정한다. Time to Interactive와 관련이 있으며 라이트 하우스 점수에서 차지하는 비중은 25%이다.

각 task에서 50ms 를 뺀 값을 모두 더한 값이 Total Blocking Time이 된다. TBT는 하나의 태스크가 수행되는 시간이 짧을 수록 유리하다. TBT와 TTI가 항상 비례 관계를 갖지는 않는다. 예를 들면, 50ms의 시간이 걸리는 태스크가 10개 있다면, TTI 지수는 나쁘겠지만 TBT는 좋게 측정될 것이기 때문이다. 하지만 함수가 실행되는 시간을 짧게 가져간다면 대부분은 유의미한 변화가 있다.

### Culmulative Layout Shift

사용자가 예상하지 못하는 레이아을 경험하는 빈도를 정량화하여 시각적인 안정성을 판단한다. 라이트 하우스 점수에서 5% 만 차지하지만, 유저 경험 측면에서는 굉장히 중요한 비중을 가진다고 생각한다.

## 해결하기

### layout shift 관련 문제 해결하기

새로 고침을 반복하면서 확인해 본 결과, CSS가 굉장히 느리게 반영되는 문제가 있었고, 이에 레이아웃에 큰 영향을 미치는 `display: flex` 등이 느리게 적용되어 layout shift가 발생하는 문제가 컸다.
이는 기존에 발생하지 않았던 문제였고, `tailwindcss`만 사용하지 않고 `styled-components`를 혼합하여 사용할 때부터 발생한 문제였다.
`styled-components`를 사용하기 위해서는 `next.config.js`에서 설정을 해 줘야 하는 것으로 알고 있어 설정했다.

```tsx
// next.config.js

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
```

컴파일은 제대로 됬지만, 서버 사이드에서 스타일이 적용되지 않는 문제가 발생하고 있다는 사실을 알고 찾아본 결과 추가적인 설정이 필요했다. `styled-components`를 서버사이드에서 적용하기 위해서는 `_document.tsx` 파일을 만들고, 서버에서 적용되도록 설정이 필요했는데 이 부분을 나중에서야 알았다. 이 부분은 github issue에 누군가가 남겨두어 해결할 수 있었다.

```tsx
// document.tsx

import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import type { DocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
```

다음과 같이 서버 사이드에서 미리 스타일을 적용했더니 layout shift 문제가 크게 개선되었다.

### TBT, TTI 개선하기

이 부분은 개선하는 것이 조금 오래 걸렸다. 라이트 하우스의 진단을 참고하면서 진행했다.
우선 네트워크 페이로드를 줄이는 것이 가장 시급하다고 라이트 하우스가 알려줬다.

1. 현재 블로그에서 사용하고 있는 pretendard 폰트가 너무나 많은 비중을 차지하고 있음을 확인할 수 있었다.
   1. 폰트 사이즈를 줄일 수 있는 방법?
2. long task가 너무 길다. chunk 하나의 크기가 너무 크다.
   1. 코드 스플리팅을 통해 번들 하나의 크기를 줄이고, 필요할 때 로딩하는 방식으로 로딩을 개선하자.

크게 이 두 가지를 해결하여 문제를 해결해 보기로 하자.

### 폰트 용량 문제 개선하기

우선 local로 pretendard 폰트를 저장하고 사용했는데, 그 이유는 nextjs에서 폰트 관련 최적화를 해 주기 때문이다. 기존에 웹 폰트는 다음과 같은 문제가 있다.

1. 모든 html 템플릿이 렌더링 된다.
2. 렌더링 후 폰트가 적용된다.

렌더링 후 폰트가 적용되는 것이 눈으로 확인된다. 따라서 layout shift 측면에서 사용자는 부정적인 경험을 할 수 있다.
또한, next/font 기능을 이용하면 다음과 같이 font 정보가 preload되어, 먼저 적용하려고 시도함을 확인할 수 있다.

<img width="388" alt="font_preload" src="https://user-images.githubusercontent.com/56826914/224247528-f763c274-da93-4b1d-9cda-eed1235234c7.png">

그렇기에 next/font 기능을 포기할 수는 없었다. 그렇기에 다른 방법으로 네트워크 페이로드를 줄였다.

> Pretendard 폰트는 subset을 제공하여, 필수적인 글자에 대해 폰트를 적용할 수 있게 도와준다.

따라서 기존에 적용했던 `Pretendard.woff` 폰트를 `Pretendard.subset.woff` 파일로 대체하여 네트워크 페이로드를 기존 대비 33%까지 줄였다. (Pretendard font는 약 1.1MB 이지만, subset의 경우 340KB 의 용량을 갖는다.)

또한 실제로 자주 사용되는 폰트 스타일만 가져와서 적용했다. 주로 사용하는 font weight는 400, 500, 700이므로, 전부 로드하는 것이 의미가 없다고 판단되어 단 세 개의 폰트만 서버로부터 받아올 수 있도록 설정했다.

```tsx
// Pretendard.ts

import localFont from '@next/font/local';

export const Pretendard = localFont({
  src: [
    {
      path: './Pretendard-Regular.subset.woff',
      weight: '400',
    },
    {
      path: './Pretendard-Medium.subset.woff',
      weight: '500',
    },
    {
      path: './Pretendard-Bold.subset.woff',
      weight: '700',
    },
  ],
});
```

따라서 네트워크 페이로드에서 폰트가 차지하는 비중을 기존 대비 1/9 로 낮출 수 있었다.

### 번들 크기 개선하기

Next가 아닌 React에서도 번들 크기를 줄이려는 시도는 많이 해왔다. 번들 하나가 차지하는 크기가 클 수록 브라우저에서 함수를 평가하는데 소요되는 시간 역시 비례하여 증가하기 때문이다. 따라서 필요하지 않은 번들은 당장에 로드하지 않도록 만드는 것이 최적화 측면에서 필수적이다.

Next.js는 이 부분에서 `next/dynamic`이라는 api를 통해 코드 스플리팅을 제공한다. 심지어 nextjs는 해당 컴포넌트가 ssr 환경에서 렌더링 되는 것을 방지하는 기능도 있다! 모달 컴포넌트 같은 경우는 서버 사이드에서 전혀 필요 없는 부분이므로 굉장히 도움이 되는 기능이라고 생각한다. 또한 loading 중에 어떤 컴포넌트를 보여줄 지(예를 들면 Skeleton 같은) 선택도 가능하므로, 굉장히 유용하다.

우선 어떤 부분이 병목 현상을 일으키는지 살펴보았다.
이전에 Notion 기반 블로그에서도 가장 문제가 되는 부분이 마크다운으로 변환하는 과정이었고, 그 다음 마크 다운을 렌더링 하는 부분이 리소스를 크게 먹는 부분이었다. 때문에 post를 보여주는 부분 자체를 코드로 스플리팅하였다. 또한 컴포넌트를 불러오는 동안 포스트와 유사한 모양을 하고 있는 스켈레톤을 컴포넌트를 불러올 때 보여줄 수 있도록 하였다.

```tsx
const LazyLoadedPost = dynamic(() => import('../../components/Post'), {
  loading: () => <PostSkeleton />,
});
```

또한, `React-Markdown` 뿐 아니라 코드 블럭 렌더링을 위한 `syntax-highlighter`또한 많은 부분을 차지하고 있는 것으로 확인되어 이 부분도 동일한 방법으로 Spliting을 진행했다. 다만 이 부분은 크게 개선되지 못했는데, analyzer를 통해 코드 번들 크기를 확인해 본 결과 `syntax-highlighter`가 너무나도 많은 부분을 차지하고 있었고, 페이지를 느리게 하는 근본적인 원인임을 깨닫게 되었다.

그래서 이 패키지를 사용하지 않고 직접 만들어서 써야 할 지 고민하고 있던 와중에, `react-syntax-highlighter`의 README 파일을 정독해본 결과, 본인들도 JSX 문법을 해석하는데 사용되는 `Prism`이라는 패키지가 너무 무겁다는 사실을 알고 있었고, 그래서 패키징을 minified 시킨 `PrismLight`라는 패키지가 존재하였다. 또한, 우선적으로 렌더링되야 하는 상황에 대비하여 비동기적으로 동작하는 `PrismLightAsync`패키지가 존재하여 패키지를 대체하였다.
패키지를 대체하고 bundle analyzer를 통해 확인해 본 결과, 각 번들 크기가 매우 작아졌음을 확인할 수 있었다. 물론, 어떤 부분에서 병목 현상이 발생했는지 조사하고, dynamic을 통한 코드 스플리팅이 동시에 이루어진 덕분에 이룰 수 있었던 성과다.

<img width="600" alt="after_code_splitting" src="https://user-images.githubusercontent.com/56826914/224254467-a67dca47-5bfe-4b5e-97d5-1cb21008963a.png">

## 개선 결과

측정은 이전과 동일한 게시글의 라이트 하우스 점수를 측정했으며, 측정 시마다 점수 차이가 발생했기 때문에 개선 결과가 확연히 드러나는 결과를 가져왔다.

같은 게시글을 측정했을 때 굉장히 큰 폭으로 성능이 개선되었다. 물론 Largest Contentful Paint가 아직 아쉽지만, 코드 블록이 크기가 커져서 발생하는 문제이기 때문에 해결하는 것이 쉽지가 않다. 마크다운 문서 특성상 해당 부분을 문서별로 컨트롤 하는 것이 어렵다.

기존 대비 약 64%의 성능 향상을 이룰 수 있었다. 또한 세부적인 사항에 대해서도 의미 있는 개선이 있음을 확인할 수 있었다.

<img width="411" alt="post2_lighthouse_after" src="https://user-images.githubusercontent.com/56826914/224255086-e4f8d261-b9e8-4a3c-9ae0-f93fb3673737.png">

## 마치며

우선 기존의 notion 기반의 블로그를 서비스 하지는 못했으나 정적 마크다운 기반 블로그를 서비스 할 수 있었고, 성능 측면에서 의미있는 개선을 시도할 수 있었다는 점이 굉장히 뿌듯했다. 이로서 블로그 서비스에 더 큰 오너십을 가질 수 있게 되었다.
물론 게시글을 올릴 때마다 새롭게 빌드 과정을 거쳐야 하지만, 이 부분은 vercel이 자동으로 배포해주기 때문에 어느정도는 해결된 문제이기도 하다. 추후 더 좋은 방법에 대해 고민해 봐야겠다.

#### 앞으로 개발 방향

우선 큰 덩어리(성능 개선 및 댓글 서비스 연결)들은 어느정도 완성 되었기 때문에, 기능 고도화 및 UI 고도화를 진행할 예정이다. 세부적으로 들어간다면 아직도 부족한 부분이 많이 있기 때문에 이러한 부분을 잡아가려고 한다.

예를 들면,

- 다크 모드 지원
- SEO 고도화
- 컴포넌트 고도화
- 토스트 컴포넌트 구현

피드백 사이트가 있기 때문에 피드백을 언제든지 할 수 있다. 피드백 사이트는 여기다. [피드백](https://portfolio-mrbartrns.vercel.app/feedback)

## 출처

- [라이트하우스 성능 지표 살펴보기. 아주 조금만 더 알아보기🔎 | by Jung Han | Jung-han | Medium](https://medium.com/jung-han/%EB%9D%BC%EC%9D%B4%ED%8A%B8%ED%95%98%EC%9A%B0%EC%8A%A4-%EC%84%B1%EB%8A%A5-%EC%A7%80%ED%91%9C-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-83df3dc96fb9)

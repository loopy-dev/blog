---
title: create-react-app은 더 이상 최선의 선택이 아닐 수 있다.
createdTime: 2023-04-12
tags:
  - React
  - Next.js
  - webpack
  - babel
description: create-react-app은 여전히 최선의 선택일까?
---

> 이 글은 [다음](https://velog.io/@eunbinn/how-to-start-a-react-project-in-2023?utm_source=substack&utm_medium=email)의 글을 보고 인사이트를 받아 작성했습니다.

기존에 React 프로젝트를 만드는 가장 빠른 방법은 `create-react-app` 패키지를 이용하는 것이었다. create-react-app은 facebook에서 만든 패키지로, 별 다른 설정 없이 빠르게 React 환경을 구축할 수 있게 해 준다. 그러나 나도 그렇고, 최근에는 create-react-app을 사용하지 않는 것 같다. 더 좋은 옵션들이 많다고 생각하기 때문이다.

## create-react-app은 마법이 아니다.

create-react-app은 마법이 아니다. 실제로 내부 패키지를 분석해보면 babel을 이용하여 트랜스파일링하고, webpack으로 파일들을 번들링하는 구조이다. create-react-app을 더 이상 사용하지 않는다는 것은, webpack 또는 babel보다 더 좋은 옵션이 있다는 뜻과 동일하다.

## Webpack

웹팩은 번들러이다. 공식 문서에 따르면, 모든 자바스크립트 파일을 하나의 파일로 묶어주는 도구이고, 이를 통해 파일의 실행 속도를 높일 수 있고 유지보수를 편리하게 해준다고 한다.

하나의 파일로 묶어주는 것이 어떻게 유지 보수를 편하게 해주는가에 대해 이해하기 위해서는 웹팩이 처음 나왔을 때 시대적인 배경을 알면 쉽게 알 수 있다.

웹팩은 2012년 3월 10일에 출시하였다. 이 당시 브라우저는 모듈이라는 개념이 없었다. 최근에는 `<script type module src="index.js"></script>`와 같이 모듈 형식으로 지원하지만, 그 당시에는 하나의 파일에 스크립트를 작성하곤 했다(사실 이 시절에 웹 개발을 안해봐서 그냥 그렇다고 들었다). 또한 이 당시에는 es6 이전이었으므로 var를 통해 변수를 선언했는데, 이는 현재 사용하는 let과 const와는 스코프가 다르기 때문에 개발상에서 혼란을 겪을 수 있었다.

하나의 파일에서 개발을 진행했기 때문에 전역 스코프가 오염될 수 있는 문제도 있으며, 각 역할별로 파일이 분리되지 않아 유지 보수성도 많이 떨어진다. 그래서 기존에는 이런 문제점을 극복하기 위하여 즉시 실행 함수 패턴(IIFE)를 이용하여 개발을 진행하곤 했다.

```tsx
// IIFE
(function() {
  var a = 1;
  console.log(a);
})()
```

var는 let과 const와 달리 함수 단위 스코프를 갖는다. 따라서 함수 내에서 var로 변수들을 선언하고 해당 함수를 즉시 실행하면 전역 변수의 오염을 방지할 수 있다. 하지만 각자 다른 파일로 관리하는 것 보다는 유지 보수성이 떨어질 것이다.

웹팩은 모듈 형식으로 되어있는 파일들을 하나의 파일로 만들어주며, 구형 브라우저에서도 원하는 동작을 할 수 있도록 한다. 또한 자바스크립트 뿐 아니라 css, react등 다양한 형식의 파일도 로더를 통해 변환하여 브라우저가 읽을 수 있도록 도와준다. webpack 자체가 기본 자바스크립트와 json 파일을 해석하고 번들링할 수 있지만, 최근에는 프론트엔드 분야에서 타입스크립트, 그리고 React가 대세가 되었고 이를 해석하는 것은 babel과 같은 loader에게 위임한다.

## Babel

babel은 트랜스파일러이다. 여러 플러그인을 통해 다양한 문법을 브라우저가 해석할 수 있는 자바스크립트로 변환해준다. 플러그인에 따라 타입스크립트를 자바스크립트로 변환, React jsx 문법을 자바스크립트로 변환, 또한 es6 문법을 구형 브라우저가 읽을 수 있는 es5 문법으로 변환시켜줄 수 있다.

다양한 동작은 [여기](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=JYWwDg9gTgLgBAbzgVwM4FMDKMCGN1wC-cQA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=false&presets=env%2Creact%2Cstage-2%2Ctypescript&prettier=true&targets=&version=7.21.4&externalPlugins=&assumptions=%7B%7D)에서 시도해볼 수 있다.

```tsx
// React Component
import { useState } from 'react';

const Component = () => {
  const [state, setState] = useState('hello, world!');
  
  return <h1>{state}</h1>
}

// babel
import { useState } from "react";
import { jsx as _jsx } from "react/jsx-runtime";
const Component = () => {
  const [state, setState] = useState("hello, world!");
  return /*#__PURE__*/ _jsx("h1", {
    children: state
  });
};
```

webpack과 babel 모두 출시된지 굉장히 오래되었고, 많은 사람들이 사용해 왔기 때문에 환경에 적합한 플러그인들도 굉장히 많이 출시된 상태이다. 따라서 개발자의 입맛에 맞는 환경을 알맞게 구성할 수 있다는 것이 큰 장점이다.

## webpack과 babel의 한계

Webpack과 Babel는 자바스크립트 기반이라는 것이다. `자바스크립트 환경을 구성하는데 있어서 자바스크립트를 사용하는것이 무슨 문제라도?`라고 생각할 수 있다. 실제로 전혀 문제될 것이 없다. 다만 최근에는 다양한 언어를 이용하여 자바스크립트의 한계를 극복하는 번들러와 트랜스파일러가 나오고 있다는 것이다.

자바스크립트는 싱글 스레드 언어이다. 싱글 스레드란, 프로세스 내에서 실행되는 흐름이 하나만 존재한다는 뜻이다. 즉 함수를 실행하기 위한 스택이 하나만 존재한다. 프로젝트의 크기가 작다면 이러한 부분이 문제가 되지 않지만, 규모가 커짐에 따라서 빌드 시간이 증가하게 되고 이는 개발 생산성 저하로 이루어질 수 있다.

동일한 작업을 실행할 때 멀티 스레드 언어는 싱글 스레드 언어에 비해 훨씬 빠르게 작업을 수행해낼 수 있다.

## 번들러-Vite

[vite](https://vitejs-kr.github.io/guide/why.html)는 webpack의 대안으로 고려할 수 있는 번들러이다. 커뮤니티 템플릿을 통해 react 뿐 아니라 react-ts, vue, vanilla 환경 등을 쉽게 구현할 수 있도록 도와준다.

vite는 development 단계에서는 esbuild를 통해 빌드하고, production시 rollup을 통해 번들링한다. 이렇게 단계를 나눈 이유는 vite에서 사용하는 여러 플러그인과 api가 esbuild와 호환되지 않기 때문이라고 한다. 현재는 rollup을 통해 프로덕션 빌드를 진행하지만 추후 esbuild가 발전하면 프로덕션 빌드도 esbuild를 이용하여 빌드할 계획이라고 한다.

esbuild는 go 언어로 쓰여졌으며 병렬적으로 처리가 가능하여 굉장히 빠른 속도를 보여준다.

![https://user-images.githubusercontent.com/56826914/231399732-57cf4be6-2b68-4809-ba53-db587496b4cc.png](https://user-images.githubusercontent.com/56826914/231399732-57cf4be6-2b68-4809-ba53-db587496b4cc.png)

실제로 vite를 이용하여 React 환경을 구성했을 때 create-react-app 못지 않게 빠르게 구동 환경을 만들 수 있으며 빌드 속도도 빨랐다.

```bash
yarn create vite . --template react-ts
```

다음과 같이 커맨드로 자동화된 빌드 환경을 구성할 수 있으며, 아래에 설명할 `babel` 대신에 `swc`를 사용하여 빌드 환경을 구성하는 `yarn create vite . --template react-swc-ts` 커맨드 하나로 간단히 구성이 가능하다. create-react-app과 동일한 난이도 이면서 더 다양한 옵션을 제공한다. 또한 react환경 뿐 아니라 vue, svelte, vanilla js 환경도 커맨드로 간단하게 구성이 가능하다.

다만 서버 사이드 렌더링 환경은 아직 실험 단계이니, SSR 환경을 직접 구축한다면 아직은 webpack이 더 좋은 선택일 수 있다.

## 트랜스파일러-SWC

swc는 babel의 대안으로 고려할 수 있는 트랜스파일러이다. webpack과 함께 사용할 수 있으며, swc-loader를 로더로 사용하여 구성이 가능하다. rust라는 언어로 쓰여졌으며 추후 swc 자체로 번들이 가능하도록 하는 계획을 가지고 있다. 홈페이지에서는 싱글 스레드 환경에서 최대 20배, 4코어 환경에서는 최대 70배 빠르다고 설명을 하고 있지만, 아래 테스트 결과 그 정도로 빠르게 나오지는 않았다.

swc와 webpack을 이용하여 구성하는 방법은 매우 쉽다. babel 대신에 swc를 설치하고, .swcrc 파일을 구성하면 된다. 실제로 vite를 사용하지 않고 webpack 과 swc 조합으로 빌드 환경을 구성하더라도 꽤나 괜찮은 효과를 볼 수 있다(현재 next.js에서 사용하는 빌드 환경 조합과도 같다).

우선 패키지를 설치한다.

```bash
yarn add -D @swc/core swc-loader
```

`.swcrc` 파일을 만든다.

```json
{
  "jsc": {
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "dynamicImport": true
    },
    "minify": {
      "compress": true,
      "sourceMap": false,
      "mangle": true
    },
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    },
    "target": "es5"
  },
  "minify": true
}
```

webpack.config.js 환경 설정을 한다.

```tsx
module.exports = () => {
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'swc-loader',
        exclude: /node_modules/,
      },
    ],
  }
}
```

실제로 동일한 웹팩 환경에서 테스트했을 때 기존 프로젝트에서 약 50%의 빌드 속도 향상 효과가 있었다.

![babel 환경에서 빌드 속도](https://user-images.githubusercontent.com/56826914/231407954-c6b6f2a2-4573-44f4-972b-6c9a7b8737eb.png)

babel 환경에서 빌드 속도

![swc 환경에서 빌드 속도](https://user-images.githubusercontent.com/56826914/231409444-1986b731-cba4-4c15-9e6b-db4833fc2475.png)

swc 환경에서 빌드 속도

Next.js 프레임워크 환경에서도 사용하는 조합이기 때문에 안정성 측면에서 크게 문제가 발생하지는 않을 것이라 생각하지만, 아직 버전이 1점대이기 때문에 기존 프로덕션에 도입한다면 보다 신중하게 접근해야할 필요가 있다고 생각한다.

## Next.js 와 같은 서버 사이드 렌더링 프레임워크

React는 클라이언트 사이드에서 동작하므로 검색 엔진 최적화나 FCP 부분에서 이점을 보기 위해서는 서버 사이드 렌더링 프레임워크를 사용하는 것이 좋은 선택이다.

gatsby, Next.js 등 다양한 React 기반 서버 사이드 렌더링 프레임워크 옵션이 존재하며, 환경을 구성하는 것도 간편하다. 또한 잘 짜여진, 통일된 빌드 환경을 구성하는 것도 장점이라고 생각한다. 참고로 새로운 [React 공식 홈페이지](https://react.dev/learn/start-a-new-react-project)에서도 더 이상 create-react-app으로 설치하는 것을 권장하지 않으며, 심지어 React 공식 홈페이지조차 Next.js로 홈페이지를 구성한 것을 확인할 수 있다.

## 하지만 시도해 볼 만한 가치는 있다

create-react-app 또는 vite 등의 자동화된 구성 말고, 직접 webpack과 babel을 이용하여 구동 환경을 구성해 보는 경험을 하는 것은 가치가 있다고 생각한다. 직접 환경을 만들고 빌드가 제대로 되어 화면에 Hello, World가 뜨는 그 순간은 아직도 잊을 수 없다. 직접 환경을 구성하면서 실제로 어떤 과정을 거쳐서 빌드가 이루어지는지도 알 수 있다.

## 출처

[Concepts | 웹팩](https://webpack.kr/concepts)

[웹팩](https://ko.wikipedia.org/wiki/%EC%9B%B9%ED%8C%A9)

[esbuild - FAQ](https://esbuild.github.io/faq/#why-is-esbuild-fast)

[Rust-based platform for the Web – SWC](https://swc.rs/)

[React](https://react.dev/)
---
title: 블로그 다크모드 적용기
createdTime: 2023-04-04
tags:
  - projects
  - React
  - Next.js
  - frontend
  - darkmode
description: 좌충우돌 다크모드 적용기 in next.js
series: b67c675a-e8fc-47d7-8b3a-44ed363d8956
---

# 요약

기존에 간단하게 구현했던 다크 모드를 고도화 했다!

그러나 tailwindcss를 이용하여 조금 더 통일감 있는 다크모드를 만들어 볼 예정이다.

# 기존 방식

기존에 간단하게 `styled-components`의 `ThemeProvider` 기능을 이용하여 다크 모드를 구현했었다. 다크 모드를 다루는 상태는 전역적으로 접근해야 할 필요성이 있었기 때문에 기존에 사용하던 redux를 이용하여 현재 다크 모드 상태를 저장하였고, 토글 버튼을 이용하여 전역 상태를 변경하는 방식을 사용하였다.

그러면 그 상태가 변경됨에 따라서 기존 light, dark 객체를 치환해주고, ThemeProvider의 값으로 내려주어 전역적으로 활용할 수 있도록 하였다.

```tsx
import { Provider } from 'react-redux';
import store from '~/store';
import ThemeProvider from '~styles/theme/ThemeProvider';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};
```

```tsx
import { useSelector } from 'react-redux';
import { ThemeProvider as ThemeStyledProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { dark, light } from './theme';
import type { RootState } from '~/store';

interface Props {
  children?: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const isDarkMode = useSelector((state: RootState) => state.isDarkMode);
  const theme = isDarkMode ? dark : light;

  return (
    <ThemeStyledProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeStyledProvider>
  );
};

export default ThemeProvider;
```

그렇지만 다크 모드를 고도화해야 할 필요성을 느꼈다. 기존 다크 모드는 그 상태를 로컬에 저장하지 않았기 때문에, 새로 고침하면 다시 라이트 모드로 돌아온다는 문제점이 있었다. 또한 다크 모드에 필요한 팔레트가 `text`, `background` 두 종류밖에 없었기 때문에 이 또한 고도화 작업을 함께 진행했다.

기존 React에서는 localStorage 또는 cookie에 접근하여 간단하게 사용자가 저장한 다크 모드의 상태를 불러올 수 있었고, 렌더링에 어떠한 영향도 미치지 않았다.

> 그러나 Next.js는 서버에서 렌더링을 진행한다.

서버에서 렌더링을 진행하고, 클라이언트 사이드에서 hydration을 진행하기 때문에 렌더 단계에서 `localStorage`가 선언되어 있는 `window` 객체가 정의되지 않아 에러를 발생시킨다. 따라서 localStorage에 접근하기 위해서는 useEffect hook을 사용해야 한다.

useEffect hook은 마운트가 되고 페인트가 된 뒤 실행되는 hook이기 때문에 `window` 객체에 접근이 가능하다. 그래서 상대방이 다크 모드를 설정했다 하더라도 초기에 클라이언트에 저장해 둔 상태에 접근할 수 없어, 잠시 라이트 모드 형태의 스타일이 렌더링 된 후 다크 모드로 변경되는, 플리커 현상이 발생하게 된다. 이는 프론트엔드를 공부하고 있는 사람으로써 견디기 어려웠다(플리커링 문제를 해결하지 못하여 그동안 사용자의 상태를 저장하지 않았던 것도 있다).

# 고도화

기존에 사용했던 `ThemeProvider`는 React component의 일종이고 따라서 react의 라이프 사이클대로 움직이므로, 클라이언트의 상태 값에 접근하기 위해서는 `useEffect` hook 내에서 접근이 가능하다. 따라서 `ThemeProvider`를 통한 상태를 내려주는 방식은 서버 사이드 렌더링 방식에서는 사용이 다소 어려울 듯 하여, css variable을 활용하여 다크 모드를 구현하고, `body[data-theme='dark']`일 경우 변수에 할당된 값을 변경하여 css 조작만으로 다크모드를 구현할 수 있도록 하였다.

## CSS 변수

<aside> 해당 방법론은 velopert님의 블로그를 참고하였습니다.

</aside>

> CSS 변수는 `--background: #ffffff` 형식으로 선언하여 사용할 수 있다.

### CSS 변수를 이용하면 좋은 점

- prefers-scheme-dark 기능을 활용하여 사용자의 기기 시스템이 다크모드라면 우선 다크모드 설정 가능
- 깜빡임 없이 스타일을 보여줄 수 있음

따라서 `styled-components`가 제공하는 `createGlobalStyle` 기능을 이용하여 js를 활용하여 css를 구성했다. js를 이용하여 css를 전역적으로 구성하는 이유는, 자바스크립트를 통해 컬러 팔레트 등을 보다 유지보수하기 쉽게 만들 수 있기 때문이다.

```tsx
import { createGlobalStyle } from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import { CommonPalette, Palette } from './Palette';

const lightStyle = `
  --bg-page1: ${Palette.light.bg_page1};
  --bg-page2: ${Palette.light.bg_page2};
  --bg-element1: ${Palette.light.bg_element1};
  --bg-disabled: ${Palette.light.bg_disabled};
  --text1: ${Palette.light.text1};
  --text2: ${Palette.light.text2};
  --text3: ${Palette.light.text3};
  --text4: ${Palette.light.text4};
  --bg-nav: ${Palette.light.bg_nav};
`;

const darkStyle = `
  --bg-page1: ${Palette.dark.bg_page1};
  --bg-page2: ${Palette.dark.bg_page2};
  --bg-element1: ${Palette.dark.bg_element1};
  --bg-disabled: ${Palette.dark.bg_disabled};
  --text1: ${Palette.dark.text1};
  --text2: ${Palette.dark.text2};
  --text3: ${Palette.dark.text3};
  --text4: ${Palette.dark.text4};
  --bg-nav: ${Palette.dark.bg_nav};
`;

const commonStyle = `
  --bg-skeleton: ${CommonPalette.bg_skeleton};
`;

const GlobalStyle = createGlobalStyle`
  :root {
    ${lightStyle}
    ${commonStyle}
  }

  body {
    transition: background-color 0.1s ease-in, color 0.1s ease-in;
    background-color: ${cssVar('bg_page2')};
    color: ${cssVar('text1')};

    &[data-theme='light'] {
      ${lightStyle};
    }

    &[data-theme='dark'] {
      ${darkStyle};
    }
  }

  @media (prefers-color-scheme: dark) {
    body {
      ${darkStyle};
    }
  }

`;
export default GlobalStyle;
```

다음과 같이 palette를 자바스크립트 객체를 이용하여 유지보수성을 높일 수 있었다.

## 렌더링 블로킹

서버 사이드 렌더링 프레임워크에서 깜빡임 없이 스타일을 적용하기 위해서는 렌더링 과정보다 먼저 사용자의 상태에 접근해야 한다. 그렇기 때문에 `<body>`의 가장 상단 부분에 theme을 설정하는 스크립트를 두어 렌더링을 잠시 블로킹한다. 또한 우선적으로 실행되어야 하므로 script에 `async` 또는 `defer` 옵션을 사용하지 않는다.

브라우저의 동작 원리에 따르면, html 파싱을 과정 중에 css를 마주치면 css를 파싱하고, js를 마주치면 자바스크립트를 파싱한다. 그리고 이 과정 중 html 파싱은 일시적으로 중지된다.

블로킹 시간을 최소화 하기 위하여 필요한 스크립트만 초기에 실행할 수 있도록 하는 것이 중요하다.

따라서 초기에 body에 theme을 설정하기 위한 코드를 다음과 같이 만들었다.

```tsx
const ThemeScript = () => {
  const setTheme = `
    (function () {
      function getInitTheme() {
        const theme = window.localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        return theme ? theme : systemPrefersDark ? 'dark' : 'light';
      }

      document.body.dataset.theme = getInitTheme();
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: setTheme }} />;
};

export default ThemeScript;
```

그리고 이 스크립트를 가장 먼저 실행시킬 수 있도록 `_document.tsx` 가장 위에 배치했다.

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';
import ThemeScript from '~/lib/styles/ThemeScript';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          {/* 여기에 배치하여 우선 실행! */}
          <ThemeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## 토글 버튼 만들기

기존 toggle 버튼은 Redux에 상태를 저장하고, 이를 버튼을 클릭하여 전역 상태를 변경하였으나 더 이상 전역적으로 상태를 관리할 필요가 없기 때문에 useState를 이용하여 상태를 관리해도 된다.

토글 버튼에 필요한 `useTheme`은 다음과 같다.

```tsx
import { useState } from 'react';

type ReturnTypes = [string, () => void];

const useTheme = (): ReturnTypes => {
  if (typeof window === 'undefined')
    throw new Error('useTheme hooks only can use on csr.');

  const [theme, setTheme] = useState(
    () => window.localStorage.getItem('theme') || 'light'
  );

  const toggle = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    const $body = document.querySelector('body');
    if (!$body) return;

    $body.dataset.theme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
  };

  return [theme, toggle];
};

export default useTheme;
```

localStorage 값에 접근할 때 `useEffect`를 사용하지 않고 바로 초기화 해주었다. 일반적은 서버 사이드 렌더링 환경이라면 에러가 나는 것이 당연하다. 그러나 처음에 light 글자가 뜨고, 후에 dark로 변경되는 부분을 방지하기 위해 토글 버튼만 client side rendering으로 진행하려고 한다.

원래는 navigation bar 자체를 클라이언트 사이드 렌더링으로 하려고 하였으나 layout shift가 너무 크게 발생하여 토글 버튼만 클라이언트 사이드 렌더링으로 진행하였다.

```tsx
import dynamic from 'next/dynamic';

const ThemeToggleButton = dynamic(() => import('./ThemeToggleButton'), {
  ssr: false,
});

const NavigationBar = () => {
  return (
    // TODO - add color pallete on themes
    <Container>
      {/** upper part of NavigationBar */}
      <PrimaryContainer>
        {/*...*/}
        <ItemWrapper className="right">
          <ThemeToggleButton />
          <NavigationLinks />
        </ItemWrapper>
      </PrimaryContainer>
    </Container>
  );
};

export default NavigationBar;
```

![https://user-images.githubusercontent.com/56826914/229739103-00520b2d-5080-4c46-84c7-9ca0a2ac3621.gif](https://user-images.githubusercontent.com/56826914/229739103-00520b2d-5080-4c46-84c7-9ca0a2ac3621.gif)

렌더링 테스트 결과, 토글 버튼만 초기 렌더링 시 깜빡거리는 문제가 있긴 하지만, 적어도 layout shift 문제는 발생하지 않으며, 깜빡임 현상도 발생하지 않았다.

# 마치며

여러 프로젝트를 하면서 처음으로 진정한 다크모드를 구현해 본 것 같다. 다크모드를 구현하면서 서버 사이드 렌더링 프레임워크에서는 어떻게 구현해야 하나 고민이 있었는데, 다행히 좋은 레퍼런스들을 많이 보면서 방향성을 잡을 수 있어서 기쁘다. 다크모드와 스타일을 앞으로 더 고도화 하여 좋은 사용자 경험에 도전해 보려고 한다.

# 출처

[벨로그에 다크 모드 적용하기](https://velog.io/@velopert/velog-dark-mode)

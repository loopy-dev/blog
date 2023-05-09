---
title: styled components에서 sass + tailwind로 넘어가기
createdTime: 2023-05-08
tags:
  - React
  - frontend
  - tailwind
  - sass
description: styled-components에서 sass + tailwind로 옮겨가는 선택을 했다...!
---

# 개요

최근에 `styled-components` 기반으로 개발했던 블로그 프로젝트를 `sass` + `tailwind css`로 다시 작성했다. 처음에 tailwind css 기반으로 프로젝트를 진행했었고, 컴포넌트 단위로 개발을 진행하기 때문에 styled components가 훨씬 적합하다고 생각했다. 그러나 styled components로 계속 작성한 결과 느꼈던 단점들이 있었고, 이로 인해 다시 sass + tailwindcss 기반으로 넘어가기로 했다.

# Styled-components란?

styled-components는 기존에 css 또는 sass로 작성하던 스타일 시트를 자바스크립트로 작성할 수 있도록 도와주는 도구이다. `tagged template literal` 문법을 사용하여 기존에 css를 작성하던 문법과 매우 유사하게 작성할 수 있다.

```tsx
import styled from 'styled-components';

const Component = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
```

직관적으로 작성이 가능하며, 이는 다음과 동일한 효과를 지닌다.

```tsx
import styled from 'styled-components';

const Component = styled.div(`
  display: flex;
  justify-content: center;
  align-items: center;
`);
```

이렇게 작성된 스타일 속성은 파싱되어 스타일 시트로 변환되고 독립적인 클래스명을 만들어 글로벌 스타일에 영향을 미치지 않게 된다.

```html
// 결과
<style>
  .anANue {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
<div class="anAnue">Hello, World!</div>
```

## styled-components의 장점

### React와 궁합이 좋다

React와 특히 궁합이 좋다. styled-components로 작성하면, 해당 컴포넌트를 바로 jsx 문법과 함께 사용할 수 있다.

```tsx
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Component = () => {
  return (
    <Container>
      <h1>Hello, World!</h1>
    </Container>
  );
};
```

다른 프론트엔드 프레임워크는 사용 경험이 많지 않아서 잘 모르나, vue 같은 경우는 `.vue`라는 자체적인 파일 시스템을 사용하고, 해당 파일 내에 템플릿, 스크립트, 스타일을 다 같이 작성하는 형식이기 때문에 styled-components가 사용되는 사례를 많이 보진 못했다.

### 유지 보수 및 Prop을 통한 스타일 관리

styled-components는 별도의 css 또는 scss 파일이 아닌, 자바스크립트(타입스크립트)로 작성하기 때문에 타입스크립트의 인터페이스, ide 도움을 받을 수가 있다. 예를 들면, 디자인 시스템을 위해 컬러 팔레트를 만들고 인터페이스를 정의하고 난 뒤, 여기에 정의된 변수만 받도록 하여 보다 일관성있게 시스템 관리가 가능하다. 대부분 styled-components를 사용하는 개발자들도 이와 같은 이점이 매우 크기 때문에 사용하는 경우가 많을 것이다.

또한, styled-component는 prop을 통해 스타일의 변경이 가능하다. prop의 상태가 변경되면, 실시간으로 스타일이 반영되므로 React의 상태와 간단하게 연동할 수 있다는 점이 크다.

```tsx
// Palette

interface Palette {
  text1: string;
  text2: string;
  text3: string;
}

const ColorPalette: Palette = {
  text1: '#121212',
  text2: '#9a9a9a',
  text3: '#efefef',
};

const Component = styled.button<Props>`
  color: ${({ variant }) =>
    variant === 'primary' ? ColorPalette.text1 : ColorPalette.text2};
`;
```

그리고 `css` 함수를 이용하여 재사용성이 높은 스타일을 별도로 관리할 수 있으며 재사용이 가능하다.

```tsx
import styled, { css } from 'styled-components';

const flexStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Component = styled.div`
  ${flexStyle}
`;
```

## styled components의 단점

### 자바스크립트 실행으로 인한 성능 이슈

styled component에서 갈아타야겠다고 결심한 가장 큰 이유이다. 고사양 컴퓨터에서는 문제가 없으나, 현재 개발할 때 사용하는 저사양 노트북과 같은 경우 라이트 하우스 점수가 낮은 이슈가 있었다.

lighthouse 점수를 확인하면 TBT(total blocking time)에서 지수가 낮음을 확인할 수 있었고, 주요 원인은 Script evaluation과 layout 계산 과정임을 확인할 수 있었다.

이는 브라우저의 렌더링 과정과 연관이 있다.

브라우저는 다음과 같은 과정으로 렌더링을 진행한다.

1.  브라우저가 서버로부터 렌더링에 필요한 리소스를 받아온 뒤 html 파싱을 시작한다.
2.  스타일 시트를 파싱하여 cssom 트리를 만들고, dom tree와 결합하여 렌더 트리를 생성한다.
3.  렌더 트리를 기반으로 화면에 배치하고 그린다.

자바스크립트의 파싱이 이루어지는 동안 문서 파싱은 일시적으로 중지되며, async 또는 defer 옵션을 통해 문서 파싱이 완료된 뒤 실행을 미룰 수 있다.

더 자세한 과정은 [브라우저는 어떻게 동작할까](https://d2.naver.com/helloworld/59361) 라는 글에서 확인할 수 있다.

styled-components는 js로 쓰여져있고, 따라서 스크립트 실행을 통해 모든 것을 처리한다. 기존에는 css를 stylesheet로 처리하고, 다른 로직을 js로 처리하는 것과 달리 하나의 과정으로 처리를 하기 때문에 속도가 그만큼 느려지게 된다. 또한 번들 크기의 증가로 이어지기 때문에 처리하는 양 자체에도 차이가 있을 것이다.

자바스크립트 코드의 평가가 끝나기 전에는 상호작용이 블로킹되고, 이는 TBT의 증가로 이어지게 된다. 물론 빌드 타임에 stylesheet를 만들어주는 css in js 패키지들이 있긴 하지만, 정보의 부족으로 인해 실제로 채용하기에는 어려웠다.

결론은 스크립트 평가 시간이 레이아웃과 스타일 처리에 많은 리소스를 차지하고 있는 것이 다소 아깝다고 생각을 해서, sass + tailwind로 이동하고자 마음을 먹게 되었다.

# 다시 sass와 tailwind의 조합으로

styled components의 개발 편의성을 뒤로 하고, sass와 tailwind의 조합으로 넘어오기로 했다. 다만 sass는 최소한으로 사용하고, tailwind를 최대한 활용하여 개발 편의성 증가와 통일된 디자인을 노리기로 했다.

## sass(scss)

sass는 css의 전처리기(preprocessor)로서 동작하며, 빌드 시 브라우저가 읽을 수 있는 css로 변환하여 개발 편의성을 증가시킨다 css로 작성하다 보면 중첩된 스코프를 지원하지 않아 반복적으로 작성해야 하는 경우가 굉장히 많은데, sass는 이 부분을 완전히 해결한다.

```scss
/* 이런 방식으로도 작성할 수 있다. */
.button {
  &__primary {
    background-color: var(--primary);
  }

  & + & {
    margin-left: 16px;
  }
}
```

모듈 형식을 지원하기 때문에 `.button` 이라는 클래스가 다른 컴포넌트에서 사용되더라도 스타일이 겹칠 일이 없다. 모듈 형식의 css(scss)는 다음과 같이 사용할 수 있다.

```tsx
import classes from 'button.module.scss';

const Button = ({ children }) => {
  // button.module.scss에 정의한 클래스명들을 사용하면 된다.
  return <button className={classes.button}>{children}</button>;
};
```

## tailwind css

tailwind css는 css의 각 속성들을 클래스로 표현하여 보다 빠르고 직관적으로 css를 사용할 수 있다.

```scss
.button {
  padding: 4px 16px;
  background-color: white;
  border: 1px solid;
}
```

윗 코드는 아래 코드와 동일하게 동작한다.

```tsx
const Button = (props) => {
  return <button className="py-1 px-4 bg-white border">{children}</button>;
};
```

tailwind css를 사용하면서 느낀 점은, 구체적인 디자인 시스템이 갖춰저 있지 않은 상태에서 빠르게 디자인을 구축하고 수정하기에 적당하다고 생각했다. 특히 수치적인 부분이 이미 정해져 있기 때문에 통일감 있는 디자인을 빠르게 구축하기에 용이하다고 생각했다. 그리고 tailwind css는 빌드 타임에 사용되지 않는 클래스들을 제거하기 때문에 번들 크기 상에서도 이점을 가질 수 있다.

다만, tailwind로 완벽한 동적인 웹을 구성하는데 한계가 있다. 특정 요소와 특정 요소의 조합(& + &) 같은 경우 tailwind만으로 구성하기는 어려워서 결국에는 sass와 섞어서 써야 한다. 다행히도 sass 파일 내에서도 동일하게 tailwind를 사용할 수 있다.

또한 `@apply`와 같은 비표준 문법을 사용하여 css 모듈 또는 scss 모듈과 함께 사용할 수 있다(PostCss와 함께 사용하므로 비표준 문법에 대한 처리가 자연스럽게 해결된다).

```scss
.button {
  @apply py-1 px-4 bg-white border;
}
```

다만 tailwind css만으로 기존에 styled-components처럼 prop의 변경에의한 동적인 스타일 변경 처리가 다소 아쉬웠다. tailwind css의 경우 문자열 형식으로 작성하고, 빌드 타임에 사용되지 않는 클래스명을 제거하기 때문에 의도한 동작을 구현하는 것이 쉽지 않았다. 예를 들어, 다음과 같은 동작은 동적으로 구현되지 않는다.

```tsx
const Button ({loading, children}: Props) => {
  // class명을 쪼개는 방식으로 작성은 불가능하다.
  <button className={`bg-${loading ? 'gray-500' : 'white'}`}>{children}</button>
}
```

만약에 동적인 클래스를 구성하기 위해서는 클래스명을 쪼개는 것이 아니라 `loading ? 'bg-gray-500' : 'bg-white'` 형식의 완전한 형태로 클래스를 작성해야 한다. 그런데 3항 연산자가 많아질 수록 클래스명 관리가 굉장히 어려울 것이라고 생각하여, `classnames`라는 패키지를 도입하여 클래스명을 보다 깔끔하고 조건적으로 관리할 수 있도록 하였다.

```tsx
import classNames from 'classnames';
import css from 'layout.module.scss';

const Layout = ({ left, right, sticky }: Props) => {
  return (
    <div
      className={classNames(
        'flex',
        'relative',
        'md:flex-row',
        'flex-col',
        'gap-4',
        'w-full'
      )}
    >
      <aside
        className={classNames(
          css.left,
          { 'md:sticky': sticky }, // 이 조건은 sticky가 참일 때에만 적용된다.
          'self-start',
          'top-16'
        )}
      >
        {left}
      </aside>
      <article className={classNames(css.right)}>{right}</article>
    </div>
  );
};
```

# 결과

기대했던 결과보다는 차이가 크지 않았지만, 약간의 유의미한 변화는 있었다. 큰 변화가 없었던 이유는, 기존에도 css in js 형식으로 많은 스타일을 작성하지 않았기 때문에 큰 변화는 발생하지 않았던 것으로 추정된다. 단 카카오 웹툰의 기술 블로그에 따르면, 요소가 조금씩 많아질수록 이 차이는 더욱 커질 것으로 생각하여, 길게 바라봤을 때 tailwind + sass 조합으로 이동한 것이 좋은 선택이라고 확신한다.

# 출처

[카카오웹툰은 CSS를 어떻게 작성하고 있을까? | 카카오엔터테인먼트 FE 기술블로그 (kakaoent.com)](https://fe-developers.kakaoent.com/2022/220210-css-in-kakaowebtoon/)

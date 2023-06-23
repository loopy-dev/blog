---
title: 다사다난했던 npm 패키지 배포(iframe, embed등)
createdTime: 2023-06-13
tags:
  - projects
  - React
  - frontend
  - npm
  - rollup
description: 패키지 배포도 처음하면 어렵다
series: b67c675a-e8fc-47d7-8b3a-44ed363d8956
coverImage: /thumbnails/npmjs.jpg
---

> 틀린 내용이 있을 수도 있습니다.

# 개요

블로그를 만들면서 새로운 기능인 알고리즘 문제 풀이 섹션을 개발하는 과정에서 gist를 사용하고자 었고, 이를 위하여 `react-gist`라는 패키지를 사용하였다.

그러나 pull request 단계에서 github actions으로 걸어둔 빌드 테스트가 제대로 되지 않는 현상을 발견했다. `react-gist`를 만든 저작자가 프로젝트를 더 이상 업데이트 하지 않고 있었기 때문에 최신 버전의 react에 대응하지 않았기 때문이었다.

이를 해결하기 위하여 `npm install --force` 옵션을 통해 action을 통과시켰지만, 찝찝한 기분은 가시지 않았다. 기존 저작자가 만들었던 프로젝트는 장기간 업데이트 되지 않아 issue, pr을 승인하지도 않았기 때문에, 최신 버전에 대응할 수 있는 패키지를 만들자!!! 해서 만들었다.

[gist-react-repository](https://github.com/mrbartrns/gist-react)

# 컴포넌트 만들기

우선 기본적인 react 환경에서 내가 의도한 대로 컴포넌트가 잘 동작하는지 확인하는 과정을 거쳤다. 처음에 vite 기반으로 리액트 프로젝트를 만들고, 바로 테스트하여 띄울 수 있는지 확인했다.

기존 프로젝트가 class 기반의 컴포넌트였기 때문에, 최신 React 문법으로 작성하는 것을 가장 큰 목표로 했다. 일반 html에서 gist를 embed하기 위해서는 gist에 embed 기능을 이용하여 삽입할 수 있으나, react 프로젝트에서는 동작하지 않는다. nextjs 같은 경우는 자체적으로 제공하는 Script를 이용하면 비동기적으로 스크립트가 실행되며, gist에서 비동기적으로 실행을 허용하지 않는다(근데 Next.js 뿐만 아니라 일반 React 환경에서도 script 태그를 이용하여 gist를 불러올 수 없었다). 따라서 iframe을 이용하여 화면 속의 화면을 만들고, 거기서 gist를 embed 하는 방식을 사용하기로 했다(기존 패키지도 이러한 방식으로 작성되었다).

## iframe

**`<iframe>`** 요소는 다른 문서를 포함하거나 외부 문서를 로드하는 데 사용되는 HTML 요소이다. iframe을 이용하여 화면 속에 화면을 띄우는 방법은 크게 두 가지가 있다.

### document.write를 이용하여 렌더링하기

document.write를 이용하여 화면을 띄우는 방법은, 동적으로 문서를 변경하는 방식으로 작동한다. 또한, 스크립트 실행 중에 호출되며, 현제 문서에 텍스트를 작성하게 되는데, 브라우저가 문서 파싱 중에 `document.write`가 호출되면 파싱이 중단되고 작성된 내용을 처리한다. 따라서 렌더링 지연이 발생할 수 있다.

document.write를 이용하여 iframe을 작성할 때 다음과 같이 작성할 수 있다.

```tsx
const App = () => {
  const ref = React.useRef();

  React.useEffect(() => {
    if (!ref.current) return;

    const document = ref.current.contentDocument;
    const script = `<html>
      <head>
        <style>
          html {
            color: blue;
          }
        </style>
      </head>
      <body>
        <p>Hello, World!</p>
      </body>
    </html>`;

    document.open();
    document.write(script);
    document.close();
  }, []);
  return <iframe ref={ref} />;
};
```

이 스크립트를 작성하면 다음과 같은 결과를 얻을 수 있다.

![image](https://github.com/mrbartrns/blog/assets/56826914/bb6a1439-27c2-4c58-9c02-a5d2206ba402)

### srcdoc에 스크립트를 작성하여 렌더링하기

iframe에 srcdoc 프로퍼티가 있고, 여기에 스크립트를 인라인으로 정의할 수 있다. src는 외부 파일을 불러들여 렌더링하는 것이지만, srcdoc은 외부 파일 로드 없이 인라인 스크립트를 렌더링한다는 점에서 차이가 있다. 일반적으로 srcdoc는 작은 내용이나 정적인 콘텐츠에 적합하다고 한다.

```tsx
const App = () => {
  return (
    <div className="App">
      <iframe srcDoc="<p>Hello, World!</p>" />
    </div>
  );
};
```

gist를 embed 하는 것은 충분히 작은 내용이라고 생각할 수 있고, gistId가 변하지 않는 이상 콘텐츠 내용이 변할 일이 없기 때문에 렌더링 성능 측면에서 이점을 가져올 수 있는 srcdoc로 컴포넌트를 만들기로 했다.

다양한 방식으로 테스트해본 결과, 단순히 srcDoc에 스크립트를 넣는 것으로만으로는 렌더링이 되지 않았고, 따라서 useEffect를 이용하여 srcdoc를 직접 설정해 주었다.

# 배포 준비 - 컴포넌트 빌드하기

처음에 vite를 이용하여 화면에 띄우는 것 까지 테스트를 하였으나, 일반적으로 홈페이지를 구성할 때의 구조를 그대로 배포하는 것은 안된다. 필요 없는 부분까지 배포하게 되기 때문이다. 따라서 홈페이지가 아닌 단일 컴포넌트를 배포하는데 있어서 적합한, `rollup` 번들러를 이용하여 배포를 하기로 했다. 또한 폴더 구조는 src 내부에 `Gist.tsx`와 `index.ts` 두 개만 존재하도록 하였다.

## Rollup

롤업 (Rollup)은 자바스크립트 애플리케이션을 번들로 패키징하는 데 사용되는 JavaScript 모듈 번들러이다. 번들링은 애플리케이션에 필요한 모든 코드와 종속성을 단일 파일로 결합하는 프로세스를 말합니다. 롤업은 모듈 시스템을 사용하는 프로젝트에서 사용하기에 이상적인 도구이다.

rollup은 다음과 같은 특징이 있다.

1. 트리 쉐이킹 (Tree Shaking): 롤업은 애플리케이션에서 실제로 사용되지 않는 코드를 자동으로 제거하여 번들 크기를 최소화 → 애플리케이션의 성능 향상
2. 코드 분할 (Code Splitting)
3. 다양한 모듈 포맷 지원: ES 모듈, CommonJS, AMD, UMD 등 다양한 모듈 포맷을 지원

롤업은 주로 웹 애플리케이션 또는 라이브러리의 번들링에 사용되기 때문에, 단일 컴포넌트를 배포하는데 있어서 가장 적합한 번들러라고 생각했다.

롤업 자체는 이번에 처음 사용해 보았기 때문에, 기본적으로 다른 템플릿을 많이 참조하여 번들 환경을 구성하였다.

```tsx
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',
  output: [
    {
      dir: './dist',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
  ],
  external: [/node_modules/, /examples/],
  plugins: [
    resolve({
      extensions,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
      include: ['src/**/*'],
    }),
    commonjs({ include: 'node_modules/**' }),
    PeerDepsExternalPlugin(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};
```

- input: rollup이 번들링을 시작할 시점이다.
- output: 빌드 후 결과가 저장될 위치를 지정한다. 또한 하나의 포맷 뿐 아니라 여러 포맷도 지원한다. 현재는 ‘es’ 포맷만 지원하도록 설정해 두었다.
- plguins: 각종 플러그인들이다.

# 배포 준비 - 배포하기

다른 프로그램에서 해당 파일을 읽어들일 수 있기 위해서는 빌드 결과물만 배포해야 하므로, `.npmignore` 파일을 통해 배포할 파일만 배포하도록 지정해 주었다. 빌드하게 되면 타입스크립트로 작성한 파일도 자바스크립트로 변환하게 되며, 자동으로 `index.d.ts`의 선언 파일이 생기게 되므로 ide 상에서 타입을 읽어들이는데 전혀 문제가 없다. 우리는 이 빌드 후 결과물만 배포하면 된다.

## 회원 가입 하기

우선 npm에 배포하기 전에 회원가입을 해야한다. 회원가입은 npm 홈페이지에서도 가능하고, `npm adduser` 명령어를 통해 cli로도 회원가입을 할 수 있으니, 아이디가 없으면 먼저 회원 가입을 해야한다.

## Package.json

`package.json` 파일이 없다면 배포 자체가 되지 않으므로, package.json 파일은 무조건 존재해야 하며, 필수적으로 버전과 패키지 이름이 들어가야 한다. package.json에 간략하게 들어가는 내용은 다음과 같다.

- name(패키지 이름): 패키지 이름은 소문자로만 작성해야 하며, `@rollup` 처럼 앞에 organization을 붙일 수도 있으나, 이를 위해서는 실제 github 상 organization이 필요하다.
  - 이름은 중복되면 안된다. 쉽고 직관적인 이름은 이미 누군가가 사용하고 있을 수도 있으니 한번 잘 확인해보고 선정하는 것이 좋다.
  - 중복된 이름인지 간단하게 확인하는 방법은, `npm info <package name>`을 cli에 입력하여 404 에러가 발생한다면 패키지가 존재하지 않아 사용할 수 있는 이름이라는 뜻이 된다.
- version(패키지 버전): 패키지 버전은 X.Y.Z 형식으로 이루어져있다. Z → X로 갈 수록 메이저한 변화를 나타낸다. 만약 이전 버전이 배포되어 있다면, 버전을 바꾸지 않을 경우 배포가 되지 않는다(중복된 패키지 버전을 허용하지 않는다).
- scripts: 이거는 패스(스크립트는 다른 프로젝트를 하면서 많이 다뤄봤을 것이라고 생각한다. 현재 프로젝트는 rollup을 빌드하기 위한 `build`, 그리고 `eslint`가 있다.)
  - `prepublishOnly`: npm에 배포하기 전에 어떤 동작을 수행할 것인지 정의해줄 수 있다. 우리는 빌드 결과물을 배포하기 때문에 잊지 않고 최신 빌드 결과물을 배포할 수 있도록 `prepublishOnly`를 통해 빌드 과정을 수행하도록 하였다.
- license(라이센스): 코드에 대한 저작권을 정의한다.
- author(저자): 저자의 정보다. 내 정보를 적으면 된다.

```json
// package.json
{
  "author": {
    "name": "your name"
    "email": "your email",
    "url": "your url"
  }
}
```

- repository: 코드가 배포된 레포지토리 url을 적으면 된다.

```json
{
  "repository": {
    "type": "git",
    "url": "your repository url"
  }
}
```

- bugs(버그): 버그 발생 시 어디에 리포트를 할 지, url을 적으면 된다.

```json
{
  "bugs": {
    "url": "your repository url/issues",
    "email": "your email"
  }
}
```

- main, module, types: 여러 포맷으로 배포할 때, 각각의 경우에서 어떤 파일을 참조할 지에 대한 정보를 나타낸다. types의 경우, 처음에 참조할 타입(index.d.ts)의 위치를 적어주면 된다.

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/types/index.d.ts"
}
```

모든 과정이 끝났다면 `npm publish`를 입력해 배포하자.

# 초비상

0.0.1의 알파 버전에 가까운 패키지를 배포하고, 실제 프로덕션에서 사용해 보았으나, 예상하지 못한 문제가 발생했다. 타입도 잘 잡고, 코드를 작성하는데 전혀 문제가 없었지만, 빌드하는데 있어서 에러가 발생했다.

분명히 동작 테스트를 했을 때는 문제가 없었기 때문에, 빌드 하는 과정에서 문제가 생겼을 것이라고 추측할 수 있었다.

> **export 'default' was not found …**

이런 에러가 발생했었고, 몇 시간동안 삽질을 한 결과 이는 처음에 rollup 빌드를 할 때 포맷을 cjs로 설정했기 때문에 발생한 에러였음을 알 수 있었다.

처음에 cjs 포맷으로 빌드한 이유는, rollup으로 패키지를 배포하는 여러 글들에서 cjs 포맷으로 배포하는 것으로 나와 있었고, 베스트 케이스를 적용하기 위해 해당 방법을 따라 했었다. 또한 다른 패키지 빌드 결과들을 봤는데 `module.exports` 형식으로 commonjs 형식의 패키지가 정상 동작 하는 것으로 보아 문제가 없을 것이라고 생각했는데 아니었다. 이 부분은 포맷 형식을 `es` 형식으로 바꿔주고 난 뒤 해결되었다.

이 부분은 다시 시간이 있을 때 조금 더 알아봐야 할 것 같다.

처음부터 버전을 1.0.0으로 맞춰두지 않은 것을 천만 다행이라고 생각한다.

# 느낀 점과 배운 점

## iframe에 대한 이해

이번에 컴포넌트를 배포하면서 처음 iframe에 대해 다뤄보았는데, iframe을 렌더링하는 다양한 방법, 그리고 react에서 iframe을 다룰 때 여러 환경에 대응할 수 있는 방법들에 대해서 간단하게 알 수 있었다.

## npm 배포

처음 배포를 해 봤는데 배포 자체가 어렵지는 않았으나, 실제 내가 작성한 코드가 잘 동작하는지 확인하는 과정 중 트러블 슈팅을 꽤나 오래 했다. 실제 동작 환경에서 잘 돌아가는지 테스트가 충분히 진행되어야 함을 다시 한번 깨달을 수 있었다.

## 앞으로의 계획

[README.md](http://README.md) 를 작성 후 버전을 올려 정식으로 배포할 예정이다.

또한, 사용하면서 문제가 발생하는 점에 대하여 피드백을 받고, 꾸준히 업데이트를 진행할 예정이다.

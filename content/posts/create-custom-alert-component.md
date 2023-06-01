---
title: 클로저를 활용하여 커스텀 알림창 구현하기
createdTime: 2023-05-27
tags:
  - projects
  - React
  - Next.js
  - frontend
description: 커스텀 알림 컴포넌트를 구현해보자
series: b67c675a-e8fc-47d7-8b3a-44ed363d8956
---

# 개요

이 블로그에서 사용자에게 알림을 주는 부분이 몇 군데가 있었는데, 다른 기능의 우선 사항에 밀려 단순히 `window.alert` 방식을 이용하여 사용자에게 알림을 주는 방식을 이용했었다. browser native api를 이용하는 것이기 때문에 간단하게 사용자에게 알림을 줄 수 있는 방식이지만, 사용자 경험 측면에서는 좋지 않다. 만약 eslint를 사용하면서 `airbnb` rule을 사용하고 있다면, `no-alert` 경고를 ide에서 확인할 수 있다. 더 많은 내용은 [airbnb-javascript](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js) 레포지토리에서 확인할 수 있다.

window.alert가 사용자 경험에 부정적인 영향을 미치는 이유는, Modal 형태를 띄고 있기 때문이다. chrome 기준 window.alert를 호출하면 상단에 조그맣게 뜨는데, alert 창이 뜨는 동안 사용자의 인터렉션이 블로킹되며, 이는 Modal과 동일하다. Modal은 마찬가지로 사용자의 인터렉션을 막아 부정적인 영향을 끼치기 때문에 자주 사용하지 않으며, 사용자가 꼭 주목해야 하는 경고 등에 제한적으로 사용되는 경우가 많다. [Modal에 대해 더 많이 알아보고 싶다면, 다음의 글을 참고해보자.](https://yozm.wishket.com/magazine/detail/706/)

> 결론: 새로운 알림을 보여주는 컴포넌트를 만들자.

# 컴포넌트 구상하기

알림 컴포넌트를 만들기에 앞서서, 어떤 모습으로 보여지면 좋을 지 구상을 해 보았다.

- **알림이 사용자의 행동을 방해하지 않아야 함**
- 화면의 가장 상단, 그리고 가운데 노출되어야 하며, 스크롤과 관계 없이 같은 위치에서 보여줘야 함
- 알림이 나왔다가 들어가는 효과가 있어야 하며, 알림이 들어간 뒤 렌더 트리에서 완전히 사라져야 함

그림으로 나타내면 다음과 같다.

그리고 개발자의 입장에서 사용했을 때 어떻게 하면 편하게 사용할 수 있을지 역시 생각해 보았다.

- 알림을 보여주는 함수 `notificate`를 호출하면, 언제 어디서나 화면에서 노출이 되어야 함(이 부분은 `react-toast`라는 패키지에서 영감을 받았다.)
- 또한, notificate 함수를 호출할 때 노출 시간과 배경 색을 정할 수 있어야 함

이를 위하여 `AlertManager`라는 컴포넌트를 최상단에 두고 해당 컴포넌트에서 AlertQueue를 관리하는 방식을 사용하고자 했다. 전역적으로 상태를 관리할 수 있는 방법들 중에서 보편적인 방법들은, `React Context api` 사용하기, `Redux` 등 여러 방법이 있으나, 이러한 방법을 최종적으로 채택하지 않았다.

### React Context api

Context api는 React 내장 api로서 굉장히 편리하지만, Next.js 환경에서 dynamic import와 함께 사용 할 경우(dynamic import 기준으로 분리되어 있을 때) 간헐적으로 hydration error가 발생하는 경우가 많았다. 어디에서나 접근성을 높이기 위해 hydration error까지 처리하는 것은 굉장히 까다로울 수 있기 때문에 사용하지 않았다.

### Redux

현재 전역 상태 관리 라이브러리로 `redux-toolkit`을 사용하고 있다. redux는 어느 환경에서도 잘 동작하지만, React 환경 내에서 항상 `useDispatch`를 호출하여야 한다는 점이 다소 아쉽다고 생각했다. 또한 vanilla js 환경에서도 redux를 사용할 수 있는데, 이 경우에도 역시 `store.dispatch`를 호출하여야 한다. 그리고 알림 컴포넌트가 외부 상태 라이브러리에 의존하는 것이 좋을까? 에 대해서도 생각해 봤으나, 그러지 않는 것이 더 좋을 것이라고 생각했다(이로서 프로젝트에서 redux의 사용처가 더 줄어들었다).

# 이제 진짜 만들어보기

## 클로저 구조 채용

> 이번 Alert 컴포넌트를 구축하는데 있어서 가장 어려운 부분 중 하나였다.

`notificate` 만을 호출하여 React 컴포넌트의 상태를 변경하기 위해서는, 해당 컴포넌트보다 상위 스코프가 필요하다. 상위 스코프에서 어떤 식별자가 React setState를 참조하면, notificate 함수가 이 식별자를 참조하여 실행할 수 있을 것이다. 이를 위해서는 클로저 구조가 필요하다.

### 클로저?

<aside> 📌 클로저란, 이미 생명 주기가 끝난 외부 함수에서 선언된 식별자를, 반환된 내부 함수가 이를 참조할 수 있는 형태를 말한다.

</aside>

다음의 예시를 통해 클로저를 이해할 수 있다.

```tsx
const outer = () => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
};

const inner = outer();
console.log(inner()); // 1
console.log(inner()); // 2
console.log(inner()); // 3
console.log(inner()); // 4
```

1.  전역 스코프에서 `outer`라는 함수를 선언한다.
2.  함수가 실행되고, 반환 값으로 함수가 반환되었다. 또한 이 함수는 outer function scope에서 선언된 `counter` 식별자에 접근하고 값을 수정할 수 있다.
3.  외부 함수가 종료되었지만, inner 식별자가 참조하고 있는 내부 함수에서 counter에 접근할 수 있으므로, 계속해서 값을 참조할 수 있다.

이러한 구조가 가능한 이유는, 함수가 실행되면 해당 함수 스코프에서 선언된 식별자들의 정보를 Heap 영역에 저장하는데, 함수가 종료되어 콜스택에서 제외되더라도, 해당 식별자에 접근할 수 있다면 가비지 컬렉터에 의해서 메모리가 정리되지 않기 때문에 계속해서 접근할 수 있다.

## 구조

우선 React의 useState로 상태를 관리하고, 가장 상위 컴포넌트에 위치시키고자 다음과 같이 만들었다.

```tsx
// AlertManager.tsx
const AlertManager = () => {
  const [queue, setQueue] = useState([]);

  const createAlert = useCallback((text, duration, bgColor) => {
    const newAlert = {
      id: v4(), // uuid pkg
      text,
      duration,
      bgColor,
    };

    setQueue((prev) => [...prev, newAlert]);
  }, []);

  const removeAlert = useCallback((id) => {
    setQueue((prev) => prev.filter((alertState) => alertState.id !== id));
  }, []);

  return (
    <div>
      {alerts.map((alertState) => (
        <AlertItem
          key={alertState.id}
          bgColor={alertState.bgColor}
          duration={alertState.duration}
          id={alertState.id}
          message={alertState.message}
          onDone={() => {
            removeAlert(alertState.id);
          }}
        />
      ))}
    </div>
  );
};

// _app.tsx
const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <AlertManager width="640px" />
    </Provider>
  );
};
```

그리고 어디서나 `notificate` 라는 함수를 호출하여, 언제 어디서나 `createAlert` 를 호출한 효과를 내기 위하여 다음과 같이 상위 스코프에서 참조하도록 만들었다.

```tsx
const initialize = () => {
  let createAlertFn = null;

  const bind = (fn) => {
    createAlertFn = fn;
  };

  const notificate = (text, duration, bgColor) => {
    if (!createAlertFn) return;

    createAlertFn(text, duration, bgColor);
  };

  return { bind, notificate };
};

const { bind, notificate } = initialize();

export { bind, notificate };
```

1.  상위 스코프인 `initialize` 내부에서 `createAlertFn`이라는 식별자가 선언되었고, `bind`라는 함수를 통해 createAlertFn의 값을 변경할 수 있으며 `notificate`를 통해 식별자를 참조할 수 있다.
2.  `initialize` 함수가 호출되고 두 개의 내부함수를 반환했으며 해당 함수는 종료되었다.
3.  `notificate`를 통해서 식별자에 바인딩 된 함수를 호출할 수 있다.

따라서 bind를 통해 해당 함수를 식별자가 참조할 수 있게 만들어주면, 언제 어디서든 간에 notificate 함수를 통해 호출할 수 있게 된다. 따라서 기존 AlertManger에서, bind를 통해 createAlert 함수를 바인딩 시켜주는 작업이 필요하다.

```tsx
const AlertManger = () => {
  const createAlert = useCallback((text, duration, bgColor) => {
    const newAlert = {
      id: v4(), // uuid pkg
      text,
      duration,
      bgColor,
    };

    setQueue((prev) => [...prev, newAlert]);
  }, []);

  useEffect(() => {
    bind(createAlert); // 이제 notificate 함수를 호출하여 알림을 보여줄 수 있다.
  }, [createAlert]);

  return (
    <div>
      {alerts.map((alertState) => (
        <AlertItem
          key={alertState.id}
          bgColor={alertState.bgColor}
          duration={alertState.duration}
          message={alertState.message}
          onDone={() => {
            removeAlert(alertState.id);
          }}
        />
      ))}
    </div>
  );
};
```

마지막으로 AlertManger에 알림이 쌓이면 보여줄 `AlertItem`이라는 컴포넌트를 구현한다. AlertItem은 내려오는 효과와 끝나면 올라가는 효과가 필요하며, 컴포넌트가 올라가는 효과가 끝난 다음 사라져야 하므로, 이 부분은 `setTimeout`을 이용하여 구현했다. `disappear`이라는 함수에서 이 부분을 담당하므로, 해당 부분을 확인하면 된다.

### 이슈 발생

여기서 문제가 발생했었는데, 버튼을 클릭하여 연속으로 알림을 생성하면, 이전의 알림들이 정해진 시간에 사라지지 않고, 가장 마지막 알림이 사라질 때 한꺼번에 사라지는 현상이 발생했었다. `useCallback`으로 함수를 감싸주었는데도 말이다.

컴포넌트가 재렌더링됨에 따라, `onDone`의 콜백함수 참조 주소가 변경되면서 계속해서 새롭게 렌더링이 되고 있었다. `onDone` 부분에 `() => {}`는 useCallback으로 감싸지 않았으므로, 계속해서 참조 주소가 변경되고 있었다. 따라서 이 부분을 해결하기 위해, 아래 `AlertItem`에서 `useRef`로 콜백함수를 감싸 참조주소가 변경됨에 따른 리렌더링이 발생하지 않도록 하였다. 여기서 `duration`은 숫자형 자료이므로 값이 변경되지 않는 한 주소가 바뀌는 일은 없으나, 혹시 모를 상황에서 useRef로 감싸는 것도 나쁘지 않을 것이라고 생각한다.

```tsx
const AlertItem = ({
  duration = 2000,
  message,
  onDone,
  bgColor = 'success',
}) => {
  const [isShowing, setIsShowing] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const onDoneRef = useRef(onDone);

  const disappear = useCallback(() => {
    setIsShowing(false); // false시 transition

    setTimeout(() => {
      onDoneRef.current?.();
    }, 250); // transition 끝나고 callback 함수를 실행하여 queue에서 제거
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      disappear();
    }, duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [disappear, duration]);

  return <div>{message}</div>;
};

export default AlertItem;
```

## 완성

동작 화면은 다음과 같이 잘 동작한다. 애니메이션 상에서 다소 부자연스러운 부분도 있긴 하지만, 추후 개선을 통해 조금 더 자연스럽게 다듬어야겠다.

![alert-image](https://github.com/mrbartrns/blog/assets/56826914/218df130-f82d-400e-b249-beb5a66ba335)

# 느낀 점

토스트 컴포넌트와 굉장히 유사한 구조를 가지고 있다. 토스트 역시 알림을 주는 목적으로 만들어졌기 때문에 비슷할 수 밖에 없다고 생각한다. `react-toast` 패키지가 완성도도 훨씬 높고, 사용성이나 커스터마이징 부분에서 이익이 훨씬 많지만, 개인 프로젝트인 만큼 기회가 있을 때 만들어 보는 것이 도움이 될 것이라고 생각하여

클로저 구조가 무엇인지 알고 있더라도, 그것을 실제로 적용해 보는 것은 쉽지가 않았다. 이전에 황준일님의 블로그에서 바닐라 자바스크립트에서 상태관리 라이브러리를 만드는 글을 보면서 연습을 했었던 적이 있는데, 응용을 해볼 수 있는 기회가 된 것 같아서 좋다.

다음에는 더 도전할 수 있는 것들에 도전하여 대체할 수 없는 프론트엔드 개발자로 나아가야겠다.

## 자료

[javascript/best-practices.js at master · airbnb/javascript](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/best-practices.js)

[shaper](https://shaper.design/project/9jboyEBObqwAt-I9gQ4Sy)

[몇 초 만에 다양한 UI 구성하는 ‘Shaper’ | 요즘IT](https://yozm.wishket.com/magazine/detail/2026/)

[모달윈도우(팝업)를 디자인할 때 생각할 9가지 원칙 | 요즘IT](https://yozm.wishket.com/magazine/detail/706/)

---
title: 기존 프로젝트 리팩토링기
createdTime: 2023-01-05
tags:
    - refactoring
    - projects
description: 기존의 팀 단위로 진행했던 프로젝트에 대해 리팩토링을 하기로 결정했다. 리팩토링을 결심한 이유는, 기존에 시간 부족으로 인하여 하나의 페이지에 탑다운 형식으로 모든 로직과 컴포넌트를 때려넣었기 때문에, 심리적으로 매우 불편한 감정을 느꼈기 때문이다.
---

## 개요

기존의 팀 단위로 진행했던 프로젝트에 대해 리팩토링을 하기로 결정했다. 리팩토링을 결심한 이유는, 기존에 시간 부족으로 인하여 하나의 페이지에 탑다운 형식으로 모든 로직과 컴포넌트를 때려넣었기 때문에, 심리적으로 매우 불편한 감정을 느꼈기 때문이다(불편하지 않았다면, 문제점이 있더라도 리팩토링을 시도했을까 라는 생각이 들긴 한다).

## 기존 코드의 문제점

기존 코드의 문제점은 다음과 같다.


-   페이지 내에서 탑다운으로 작성되었기 때문에, 모든 로직과 하위 컴포넌트가 동일한 곳에 위치
-   따라서 모든 코드가 고유한 역할을 한다는 보장을 못함
-   퀴즈 관련 로직들이 혼재 → 해당 로직들은 추후 재사용 할 여지가 있기 때문에 분리의 필요성을 느낌


기본적으로 각 기능들에 대하여 추상화가 제대로 되어 있지 않았기 때문에 발생한 문제점들이 대부분이었다. 기존 코드를 보자면 이렇다.

```tsx
const QuizSolvePage = () => {
  const history = useHistory();
  const sliderRef = useRef<Slider | null>(null);
  const { user, setUser, isAuth } = useAuthContext();
  const { channelId, randomQuizCount, setChannelId, setRandomQuizCount } =
    useQuizContext();

  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 유저가 선택한 정답 저장
  const handleUserAnswers = () => {}

  // 점수 업데이트
  const updateUserPoint = async () => {}

  // submit 이벤트 핸들러
  const handleSubmit = async () => {}

  // Slider Options
  const settings = {...}

  useEffect(() => {
    // initialize
    
    // fetch data

  }, []);

  if (loading) return null;
  if (!(channelId || randomQuizCount)) {
    return <Redirect to='/error' />;
  }
  return (
    <ManyComponent {...} />
  );
};

export default QuizSolvePage;
```

매우 간단하게 써 놓았지만, 해당 페이지가 너무나 많은 역할을 하고 있다는 것이 한 눈에 보여진다.

-   슬라이더 상태관리
-   이벤트 처리 및 분기 처리
-   퀴즈 데이터 관리

역할 외적으로도, 함수의 이름이 명확하지 않아 한 눈에 봤을 때 무슨 역할을 하는지 알기 어려웠고, 흐름이 상식적이지 않아 읽는 사람이 코드를 따라가면서 한 눈에 알아보는 것이 조금 어려웠다.

```tsx
const QuizSolvePage = () => {
  // ...
  useEffect(() => {
    // initialize
    // ...

    const next = (quizArray: QuizInterface[]) => {
      setQuizzes(quizArray);
      setUserAnswers(Array(quizArray.length).fill(''));
    };

    (async () => {
      if (randomQuizCount && randomQuizCount > 0)
        await QuizServices.getShuffledQuizzes(randomQuizCount).then(
          (quizArray) => next(quizArray)
        );
      else if (channelId)
        await QuizServices.getQuizzesFromChannel(channelId).then((quizArray) =>
          next(quizArray)
        );
    })().finally(() => setLoading(false));
  }, [channelId, quizzes.length, randomQuizCount, setUserAnswers]);
}
```

다음과 같이 next라는 함수가 무슨 역할을 하는지 처음 본 사람은 잘 모를 것이다. 물론 next란 의미가 다음 단계를 처리한다는 뜻이기 때문에, 어떤 함수 다음 단계를 처리한다고 유추할 수 있지만 이 함수가 무슨 역할을 하는지는 내부적으로 구현 부분을 살펴봐야지 알 수 있을 것이다.

그리고, useEffect 내부에서도 초기화 단계와 fetch 단계는 서로 다른 역할을 한다고 볼 수 있으므로, 이 둘을 분리하는 것이 추후 유지보수성에 있어서 조금 더 도움이 될 것이라 판단했다.

## 개선 방향

본격적인 리팩토링에 들어가기에 앞서, 보다 효과적인 리팩토링이 될 수 있도록 목표를 명확히 하는 것이 좋을 것 같다.

> 추상화란? 어떤 대상의 중요한 점, 공통적인 부분을 묶어서 정리하는 과정

-   QuizSolvePage의 다양한 컴포넌트와 기능들을 뽑아 추상화, 각각의 컴포넌트의 역할을 보다 명확히 하기
    -   퀴즈 데이터를 다루는 부분은 useQuiz hook으로 분리하기
    -   Slider 컴포넌트를 따로 빼내기 → Slider 제어 부분은 페이지의 역할과는 관계가 없으므로 따로 분리하여 QuizSolvePage에서 따로 신경써야 할 부분이 없도록 하기
-   다소 이해하기 어려운 함수명을 보다 명확하게 하기
-   추상화 레벨 일치시키기(함수 또는 컴포넌트를 읽고 이해할 수 있도록 구현 부분을 숨기기)

## 과정

### Slider 컴포넌트 분리

현재 프로젝트는 `react-slick`이라는 슬라이더 모듈을 사용하고 있다. 해당 부분을 프로젝트에 맞게끔 변형시킨 `QuizSlider`라는 컴포넌트를 만들어 따로 관리하는 것이 좋겠다고 생각하여 이 부분은 분리를 했다.

해당 컴포넌트를 분리하면서 알게되었는데, QuizSolvePage에 `SliderButton.tsx`라는 컴포넌트만 따로 구현이 되어 있었다(팀원이 만들면서 가깝게 배치한다고 다음과 같이 배치시킨것으로 추측한다).

![https://user-images.githubusercontent.com/56826914/210724106-8a322457-4806-439d-bc8a-64ae5c3b4c2b.png](https://user-images.githubusercontent.com/56826914/210724106-8a322457-4806-439d-bc8a-64ae5c3b4c2b.png)

이 부분도 함께 응집도를 높이기 위해 디렉토리를 변경하기로 한다.

> 모든 코드는 간략하게 작성했기 때문에, 실제로 동작하지 않습니다.

```tsx
// QuizCarousel.tsx
const QuizCarousel = ({
  currentIndex,
  quizzes,
  beforeChange,
  onClickAnswer,
}: Props) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = { ...CAROUSEL_SETTINGS, beforeChange };

  return (
    <FlexWrapper>
      {/* left SliderButton */}
      <SliderButton/>
      <SliderContainer>
        {/* Slider */}
        <Slider
          {...settings}
          ref={(slider) => {
            sliderRef.current = slider;
          }}
        >
          {quizzes.map((quiz, index) => (
            <QuizCarouselItem {...} />
          ))}
        </Slider>
      </SliderContainer>
      {/* right SliderButton */}
      <SliderButton/>
    </FlexWrapper>
  );
};

export default QuizCarousel;

const CAROUSEL_SETTINGS: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: '40px',
  arrows: false,
};
```

eslint의 `"@typescript-eslint/no-use-before-define": "off"`옵션을 통해 호이스팅을 적극적으로 사용하였다. 해당 옵션을 사용하게 되면 선언하기 전에 사용하더라도 타입스크립트가 에러를 내지 않게 된다. 어차피 babel을 통해 모두 컴파일되고 하나의 파일로 번들링되기 때문에 해당 옵션을 off하고 호이스팅을 적극적으로 사용하고자 하였다.

이 옵션을 사용하게 되면, 기존대로라면 `CAROUSEL_SETTINGS` 객체를 컴포넌트 위에 배치시켜야 에러가 발생하지 않지만, 컴포넌트를 보다 위에 배치함으로써 파일을 열게 되면 컴포넌트가 바로 눈에 들어올 수 있게끔 할 수 있게 되었다. 또한 실제 옵션을 사용하는 컴포넌트와 가깝게 SETTINGS를 배치함으로서 응집도 또한 높일 수 있게 되었다.

이 컴포넌트를 만들었기 때문에 QuizSolvePage에서는 다음과 같이 불러와서 사용할 수 있다.

```tsx
const QuizSolvePage = () => {
  return (
    <QuizCarousel />
  )
}
```

더 이상 QuizSolvePage는 QuizCarousel 내부가 어떻게 구현되어 있는지 신경 쓸 필요가 없다.

### useQuiz hook 분리

기존 페이지에 작성했던 quiz 데이터와 이를 다루는 메서드들을 묶어서, 하나의 hook으로 만들어 역할을 명확히 하기로 했다.

기존 QuizSolvePage에서 Quiz 데이터를 다루는 부분은 다음과 같다.

-   퀴즈 상태
-   퀴즈 데이터를 랜덤으로 요청하기
-   퀴즈 데이터를 세트 기반으로 요청하기

또한, 유저의 퀴즈 정답은 퀴즈에 의존하기 때문에 응집도를 높이고자 유저가 선택한 정답도 함께 묶어서 useQuiz hook에 반영하기로 결정했다.

-   유저가 선택한 정답 상태
-   유저 정답을 다루는 메서드

최종적으로 useQuiz hook은 다음과 같은 정보가 들어가도록 구현했다.

```tsx
const useQuiz = () => {
  const [quizzes, setQuizzes] = useState<QuizInterface[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const handleUserAnswers = () => {};
	
  // useEffect 내부에서 사용될 수 있으므로 useCallback으로 감싸기
  const getQuizRandom = useCallback(async () => {}, []);

  const getQuizSet = useCallback(async () => {}, []);
}
```

또한 `getQuiz`라는 prefix를 붙임으로써 해당 메서드들이 퀴즈를 불러오는 로직임을 보다 명확히 알 수 있도록 했다.

### useLoading hook 구현

데이터를 불러올 때, 현재 전부 불러왔는지, 아닌지 상태를 구별하는 상태가 기존에 있었다. 이는 다른 컴포넌트에서도 사용하고 있기 때문에 따로 분리하여 구현했다. 구현 방법은 toss/slash에 구현한 부분을 기본적으로 따르고 있으나, 우리 프로젝트의 특성에 맞게끔 초깃값을 개발자가 따로 설정할 수 있도록 다음과 같이 구현하였다.

```tsx
// 프로젝트 특성상 처음에 loading이 true로 된 곳이 많으므로
const useLoading: (
  initialValue?: boolean
) => [boolean, <T>(promise: Promise<T>) => Promise<T>] = (
  initialValue = false
) => {
  const [isLoading, setIsLoading] = useState(initialValue);

  const startTransition = useCallback(async <T,>(promise: Promise<T>) => {}, []);

  return [isLoading, startTransition];
};

export default useLoading;
```

### 나머지 - 추상화 레벨 맞추기, 페이지 내 함수 명확화

추상화 레벨을 일치시켜 함수명만 읽어도 어떤 역할인지 명확히 알 수 있도록 개선했다. 다만 이 부분은 아래에 다시 작성할 건데, 맘에 들지 않는 부분도 있었다.

`useEffect`부분은 순서대로 동작함을 보장하기 때문에, 초기화 부분과 데이터를 불러오는 부분을 두 개의 hook을 이용하여 분리시켰다.

```tsx
const QuizSolvePage = () => {
  useEffect(() => {
    // initialize
  }, []);

  useEffect(() => {
    // fetch data
  }, []);
}

export default QuizSolvePage
```

또한 실제 페이지에서만 사용되는 로직들이기 때문에 다른 곳에서 사용될 여지가 없으나 페이지 내부에 두기에는 조금 뭐한 것들은 `helper.ts`에 모아두었다.

## 결과

### 폴더 구조

쌩뚱맞게 있었던 SliderButton의 위치를 옮겼고, QuizSolvePage 내부에서만 사용하는 컴포넌트임을 명확하게 하기 위하여 components 폴더 내부에 `QuizSolve` 폴더를 만들고, 해당 폴더 내부에 페이지 의존적인 컴포넌트를 모아 두었다.

```tsx
components
 ┣ QuizSolve
   ┣ index.ts
   ┣ Layout.tsx
   ┣ QuizCarousel.tsx
   ┣ QuizCarouselItem.tsx
   ┣ QuizContentArea.tsx
   ┣ QuizSubmitArea.tsx
   ┗ SliderButton.tsx
```

한 곳에 해당 페이지에만 사용하는 컴포넌트를 명확히 함에 따라 관련 부분에 대해 수정이 필요하다면 해당 부분만 찾아서 수정하고, 다른 부분에 영향을 미치지 않는다는 보장을 할 수 있게 되었다.

### 보다 명확해진 컴포넌트, 함수의 역할

하나의 역할만 한다고 말할 수는 없지만, 그래도 이전보다는 역할 별로 분리가 되었고 각자의 역할이 명확해졌다. 역할이 명확해졌기 때문에 해당 기능에 수정을 할 때 다른 먼 곳에 있는 파일을 찾지 않고 해당 파일 내에서 수정할 부분을 찾고, 수정할 수 있게 되어 유지 보수성이 증가했다. 또한 당장 테스트 코드는 없지만 테스트 코드를 작성하더라도 보다 쉽게 작성할 수 있을 것이라고 기대한다.

```tsx
const QuizSolvePage = () => {
  const history = useHistory();
  const { user, setUser, isAuth } = useAuthContext();
  const { quizzes, userAnswers, handleUserAnswers, getQuizSet, getQuizRandom } =
    useQuiz();
  const [isLoading, startTransition] = useLoading(true);

  // event handler
  const handleSubmit = async (e: React.FormEvent) => {};

  useEffect(() => {
    // initialize
  }, []);

  useEffect(() => {
    // fetch data
  }, []);
  
  // 분기 처리
  // ...
  return (
    <Components {...} />
  );
};

export default QuizSolvePage;
```

역할별로 추상화하고 해당 모듈로부터 선언적으로 함수를 불러와서 사용할 수 있도록 했으며, 결과적으로는 함수 이름을 통해 해당 함수가 어떤 역할을 하는지 한 눈에 알아볼 수 있도록 변화하였다.

### 가독성

이번 리팩토링의 본 목적은 가독성이었다. 그러나 가독성이라는 것은 여러 결과에 의해 복합적으로 나타나는 결과라고 생각한다.

그 중, `이해하기 쉬운가`는 가독성을 높이는데 가장 중요한 역할을 한다고 생각한다. 이해하기 쉬운가는 보다 추상적이기 때문에, 다음과 같이 구체화 하여 표현할 수 있겠다.

-   추상화 레벨이 비슷하여 함수만으로 어떤 역할을 하는지 알 수 있는가
-   흐름이 상식적인가
-   변수명이 구체적인가

결과적으로 현재 리팩토링한 부분의 가독성이 뛰어나지는 않을 수 있으나, 이전에 비해 상위 목표를 충족했으므로 가독성 측면에서 개선이 되었다는 확신은 든다.

## 개선의 여지가 있는 부분

### 분기 처리

현재 page는 상태에 따라서 404 페이지로 보낼 지, 아니면 컨텐츠를 표시할 지를 결정하는 역할도 하고 있다.

분기 처리를 위한 컴포넌트를 따로 만들고, 하위 컴포넌트에서 보다 구체화한다면 보다 흐름이 상식적인 컴포넌트를 구축할 수 있지 않을까라는 생각이 든다. 이는 다음 리팩토링 시 한 번 의견을 물어보고 적용을 시도해야겠다.

### 아직 명확하지 않은 QuizSolvePage의 역할

기존에 QuizSolvePage보다는 명확해졌지만, 처음 계획했었던 역할이었던 `퀴즈 데이터를 불러오고 사용자 상호작용에 집중`하는 역할로 한정짓지는 못했다.

해당 컴포넌트는 하나의 form으로 이루어져있고, validation 함수가 존재한다. 또한 현재 프로젝트 특성상 클라이언트에서 점수를 계산하고, 제출 시 점수를 계산하기 때문에 해당 로직 역시 QuizSolvePage의 helper에 위치한다. 순수 함수이기 때문에 유틸로 분류할 수 있지만 현재 컴포넌트 외에 다른 컴포넌트에서 사용하지 않는 로직이기 때문에 배치하는 위치가 굉장히 애매했다.

이는 조금 더 고민해야 할 부분이라고 생각한다.

### 우선 테스트 코드를 작성했다면

페이지에 대해 테스트 코드를 작성하고, 테스트를 통과하는지 확인한다면 의도한 역할을 잘 수행한다고 볼 수 있다.

그러나 처음 프로젝트를 진행했을 때 2주밖에 안되는 짧은 시간동안 진행했기 때문에 테스트 코드를 작성하기까지 충분한 시간은 없었다.

그렇기 때문에 리팩토링 하면서 기능이 변경되지 않도록 조심해야 했기 때문에 아무래도 소극적으로 리팩토링을 할 수밖에 없었다.

만약 테스트를 작성했었더라면 보다 공격적으로 리팩토링할 수 있지 않았을까? 또한 테스트 코드를 먼저 작성할 경우 요구사항을 보다 명확하게 테스트할 수 있기 때문에 함수의 배치 측면에서 지금처럼 크게 고민하지 않았을 수도 있었다고 생각한다.

### useQuiz hook 부분

-   응집도를 높임에 따라서 오히려 재사용성은 떨어지게 되는 것이 아닌가에 대한 걱정?
    -   미래에 퀴즈 데이터만 따로 재사용할 수 있다면 그 때 분리해도 괜찮다고 생각한다.
    -   분리하는 것이 어렵지 않기 때문이다.

## 느낀 점

기존의 코드를 리팩토링하면서 묶은 때를 씻어 내는 느낌을 받았다. 이번 리팩토링은 정말 필요하다고 생각해서 한 것도 있지만, 자기 만족을 위해서 한 것도 있다.

가독성에 초점을 두고 리팩토링을 시도했지만, 단순 가독성을 높이기 위해서는 복합적인 요소들이 고려되야 한 다는 사실을 깨달았다.

또한 테스트 코드가 없는 리팩토링은 위험할 수 있다는 사실을 깨달았다. 다만 테스트 코드를 어떻게 작성하는지 역시 굉장히 중요한 문제고, 나는 이제서야 테스트 코드의 중요성을 인지하고 어떻게 테스트 할 지를 고민하고 있기 때문에 조금 더 공부가 필요한 부분이라고 생각한다.

## 출처
[프로젝트 리팩토링](https://velog.io/@mrbartrns/프로젝트-리팩토링)


## 블로그(Blog)

기존에 사용했던 블로그 서비스를 대체하기 위해, 마크 다운 기반의 serverless 정적 홈페이지를 구축하고, 기존에 작업했던 프로덕트들을 보여주기 위한 서비스입니다.

## 구조

<details>
  <summary>폴더 구조 보기</summary>

```
src
┣ api
┃ ┣ feeback.ts
┃ ┣ instance.ts
┃ ┣ post.ts
┃ ┗ posts.ts
┣ components
┃ ┣ common
┃ ┃ ┣ Button
┃ ┃ ┃ ┣ Button.tsx
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ DeferredComponent
┃ ┃ ┃ ┣ DefferredComponent.tsx
┃ ┃ ┃ ┗ index.tsx
┃ ┃ ┣ FadeInUp
┃ ┃ ┃ ┣ FadeInUp.module.css
┃ ┃ ┃ ┣ FadeInUp.tsx
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ Footer
┃ ┃ ┃ ┣ Footer.tsx
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ Input
┃ ┃ ┃ ┣ index.tsx
┃ ┃ ┃ ┣ Input.stories.tsx
┃ ┃ ┃ ┗ Input.tsx
┃ ┃ ┣ Modal
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ Modal.module.scss
┃ ┃ ┃ ┣ Modal.tsx
┃ ┃ ┃ ┣ ModalContext.tsx
┃ ┃ ┃ ┗ useModal.ts
┃ ┃ ┣ Portal
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ Portal.tsx
┃ ┃ ┣ Skeleton
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ Skeleton.tsx
┃ ┃ ┃ ┗ SkeletonTexts.tsx
┃ ┃ ┣ TextArea
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ TextArea.tsx
┃ ┃ ┣ Tooltip.tsx
┃ ┃ ┗ WithTooltip.tsx
┃ ┣ icons
┃ ┃ ┣ BlogIcon.tsx
┃ ┃ ┣ GithubIcon.tsx
┃ ┃ ┣ Icon.tsx
┃ ┃ ┣ index.ts
┃ ┃ ┣ MailIcon.tsx
┃ ┃ ┣ PortfolioIcon.tsx
┃ ┃ ┣ ProjectIcon.tsx
┃ ┃ ┗ WebIcon.tsx
┃ ┣ layouts
┃ ┃ ┣ ArticleLayout.tsx
┃ ┃ ┣ ContentLayout.tsx
┃ ┃ ┣ ExperienceLayout.module.css
┃ ┃ ┣ ExperienceLayout.tsx
┃ ┃ ┗ GlobalLayout.tsx
┃ ┣ Main
┃ ┃ ┣ LinkButton.tsx
┃ ┃ ┣ MoreSection.tsx
┃ ┃ ┣ Slider.module.css
┃ ┃ ┗ Slider.tsx
┃ ┣ NavigationBar
┃ ┃ ┣ index.ts
┃ ┃ ┣ NavigationBar.module.scss
┃ ┃ ┗ NavigationBar.tsx
┃ ┣ Post
┃ ┃ ┣ Comments.tsx
┃ ┃ ┣ index.ts
┃ ┃ ┣ ItemSkeleton.tsx
┃ ┃ ┣ ListItem.tsx
┃ ┃ ┣ MarkdownComponents.tsx
┃ ┃ ┣ Post.module.scss
┃ ┃ ┣ Post.tsx
┃ ┃ ┣ PostContent.tsx
┃ ┃ ┣ PostSkeleton.tsx
┃ ┃ ┣ PostTitle.tsx
┃ ┃ ┗ SyntaxHighlighter.tsx
┃ ┗ Resume
┃ ┃ ┣ Activities
┃ ┃ ┃ ┣ Activities.tsx
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ ContentTemplate
┃ ┃ ┃ ┣ ContentTemplate.tsx
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ OtherLinks.tsx
┃ ┃ ┃ ┣ PersonalInfo.tsx
┃ ┃ ┃ ┣ SkillButton.module.scss
┃ ┃ ┃ ┣ SkillButton.tsx
┃ ┃ ┃ ┣ Skills.module.scss
┃ ┃ ┃ ┗ Skills.tsx
┃ ┃ ┣ Educations
┃ ┃ ┃ ┣ Educations.tsx
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ Hobbies
┃ ┃ ┃ ┣ Hobbies.tsx
┃ ┃ ┃ ┣ Hobby.tsx
┃ ┃ ┃ ┗ index.ts
┃ ┃ ┣ Introduction
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ Introduction.tsx
┃ ┃ ┣ Projects
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ Projects.tsx
┃ ┃ ┣ index.ts
┃ ┃ ┣ PersonalInfo.tsx
┃ ┃ ┗ Resume.tsx
┣ data
┃ ┣ activities.ts
┃ ┣ educations.ts
┃ ┣ hobbies.ts
┃ ┣ projects.ts
┃ ┗ skills.ts
┣ hooks
┃ ┗ common
┃ ┃ ┣ useClickAway
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ useClickAway.ts
┃ ┃ ┣ useIntersection
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ useIntersection.ts
┃ ┃ ┣ useInterval
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┣ useInterval.ts
┃ ┃ ┃ ┗ useIntervalFn.ts
┃ ┃ ┗ useLoading
┃ ┃ ┃ ┣ index.ts
┃ ┃ ┃ ┗ useLoading.ts
┣ models
┃ ┣ Feeback.ts
┃ ┣ Post.ts
┃ ┗ Resume.ts
┣ pages
┃ ┣ api
┃ ┃ ┗ hello.ts
┃ ┣ feedback
┃ ┃ ┗ index.tsx
┃ ┣ posts
┃ ┃ ┣ index.tsx
┃ ┃ ┗ [id].tsx
┃ ┣ test
┃ ┃ ┗ index.tsx
┃ ┣ index.tsx
┃ ┣ _app.tsx
┃ ┗ _document.tsx
┣ services
┃ ┣ firebase
┃ ┃ ┗ index.ts
┃ ┗ post
┃ ┃ ┣ index.ts
┃ ┃ ┗ postService.ts
┗ styles
┃ ┣ fonts
┃ ┃ ┣ Pretendard-Black.subset.woff
┃ ┃ ┣ Pretendard-Black.woff2
┃ ┃ ┣ Pretendard-Bold.subset.woff
┃ ┃ ┣ Pretendard-Bold.woff2
┃ ┃ ┣ Pretendard-ExtraBold.subset.woff
┃ ┃ ┣ Pretendard-ExtraBold.woff2
┃ ┃ ┣ Pretendard-ExtraLight.subset.woff
┃ ┃ ┣ Pretendard-ExtraLight.woff2
┃ ┃ ┣ Pretendard-Light.subset.woff
┃ ┃ ┣ Pretendard-Light.woff2
┃ ┃ ┣ Pretendard-Medium.subset.woff
┃ ┃ ┣ Pretendard-Medium.woff2
┃ ┃ ┣ Pretendard-Regular.subset.woff
┃ ┃ ┣ Pretendard-Regular.woff2
┃ ┃ ┣ Pretendard-SemiBold.subset.woff
┃ ┃ ┣ Pretendard-SemiBold.woff2
┃ ┃ ┣ Pretendard-Thin.subset.woff
┃ ┃ ┣ Pretendard-Thin.woff2
┃ ┃ ┗ Pretendard.ts
┃ ┣ globals.css
┃ ┗ Home.module.css
```

</details>

## 기술 스택

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

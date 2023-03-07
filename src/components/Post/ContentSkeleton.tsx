import styled from 'styled-components';
import Skeleton from '../common/Skeleton';

/**
 * https://github.com/velopert/velog-client/blob/master/src/components/post/PostSkeleton.tsx
 */
const SkeletonParagraph = (
  <div className="lines">
    <div className="line">
      {[3, 5, 2, 7, 6, 5, 4].map((flex, index) => (
        <Skeleton key={index} flex={flex} />
      ))}
    </div>
    <div className="line">
      {[4, 2, 6, 3, 7, 4, 2].map((flex, index) => (
        <Skeleton key={index} flex={flex} />
      ))}
    </div>
    <div className="line">
      {[4, 2, 4, 3, 2, 7, 3].map((flex, index) => (
        <Skeleton key={index} flex={flex} />
      ))}
    </div>
    <div className="line" style={{ paddingRight: '8rem' }}>
      {[4, 6, 3, 2, 3].map((flex, index) => (
        <Skeleton key={index} flex={flex} />
      ))}
    </div>
  </div>
);

const ContentSkeleton = () => {
  return (
    <Block>
      {/** post title */}
      <div className="my-16">
        <div className="title">
          <h1>
            <Skeleton flex={6} />
            <Skeleton flex={5} />
            <Skeleton flex={2} />
            <Skeleton flex={2} />
            <Skeleton flex={3} />
          </h1>
        </div>
        <div className="subinfo">
          <Skeleton noSpacing />
          <Skeleton noSpacing />
        </div>
      </div>
      {/** post content */}
      <div className="contents">
        <h2>
          <Skeleton noSpacing height="1.5em" width="5rem" />
        </h2>
        {SkeletonParagraph}
        <h2>
          <Skeleton noSpacing height="1.5em" width="7rem" />
        </h2>
        {SkeletonParagraph}
        <h2>
          <Skeleton noSpacing height="1.5em" width="7rem" />
        </h2>
        {SkeletonParagraph}
      </div>
    </Block>
  );
};

export default ContentSkeleton;

const Block = styled.div`
  h1 {
    display: flex;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    padding: 3px 2px;
    line-height: 1.3;
    margin-top: 1rem;

    & > * {
      height: 3em;
    }
  }

  .title {
    margin-top: 2rem;
    margin-bottom: 1.21875em;
  }

  .subinfo {
    display: flex;
    justify-content: space-between;

    & > * {
      width: 100px;
      height: 20px;
    }
  }

  h2 {
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    padding: 3px 2px;
    font-weight: 600;
    font-size: 1.5em;
    line-height: 1.3;
    margin-top: 1em;
  }

  .contents {
    margin-top: 4rem;
    .lines {
      margin-top: 0.75em;
    }

    .line {
      margin-bottom: 0.5rem;
      display: flex;
      font-size: 1em;
    }
  }
`;

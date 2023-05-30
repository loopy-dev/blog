import styled from 'styled-components';
import Skeleton from '../../common/Skeleton';

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

const PostSkeleton = () => {
  return (
    <Block>
      {/** post title */}
      <div className="my-16">
        <div className="header">
          <h1>
            <Skeleton flex={6} height="3em" />
            <Skeleton flex={5} height="3em" />
            <Skeleton flex={2} height="3em" />
            <Skeleton flex={2} height="3em" />
            <Skeleton flex={3} height="3em" />
          </h1>
        </div>
        <div className="subinfo">
          <Skeleton noSpacing width="30%" />
          <Skeleton noSpacing width="30%" />
        </div>
      </div>
      {/** post content */}
      <div className="content">
        <h1>
          <Skeleton noSpacing height="1.5em" width="25%" />
        </h1>
        {SkeletonParagraph}
        <h2>
          <Skeleton noSpacing height="1.5em" width="20%" />
        </h2>
        {SkeletonParagraph}
        <h2>
          <Skeleton noSpacing height="1.5em" width="30%" />
        </h2>
        {SkeletonParagraph}
      </div>
    </Block>
  );
};

export default PostSkeleton;

const Block = styled.div`
  h1 {
    display: flex;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    line-height: 1.3;
    margin-top: 1rem;

    & > * {
      height: 3em;
    }
  }

  .header {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  .subinfo {
    display: flex;
    justify-content: space-between;
    margin-top: 2.2rem;
  }

  .content {
    margin-top: 4rem;

    .lines {
      margin-top: 0.75em;
    }

    h1 {
      font-size: 1.5em;
      margin-top: 30px;
      width: 100%;

      @media (max-width: 768px) {
        margin-top: 24px;
      }
    }

    h2 {
      font-size: 1.35em;
      margin-top: 30px;
      width: 100%;

      @media (max-width: 768px) {
        margin-top: 24px;
      }
    }

    .line {
      margin-top: 8px;
      display: flex;
    }
  }
`;

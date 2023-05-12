const ListSkeleton = () => {
  return (
    <>
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
      <ItemSkeleton />
    </>
  );
};

export default ListSkeleton;

import styled from 'styled-components';
import Skeleton from '../common/Skeleton';

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
  </div>
);

const ItemSkeleton = () => {
  return (
    <Container>
      {/** TODO - left: title, description; right: cover image */}
      <div className="w-full">
        <h3>
          <Skeleton height="" width="35%" />
        </h3>
        <div className="post-tags">
          <Skeleton borderRadius="9999px" width="12%" />
          <Skeleton borderRadius="9999px" width="15%" />
          <Skeleton borderRadius="9999px" width="10%" />
          <Skeleton borderRadius="9999px" width="12%" />
        </div>
        <div>{SkeletonParagraph}</div>
        <div className="footer">
          <Skeleton width="14%" />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 4px 0 12px;

  h3 {
    font-size: 1.5em;
    margin-top: 1.5rem;
  }

  .post-tags {
    margin-top: 8px;
    display: flex;
    font-size: 1.3em;
  }

  .lines {
    margin-top: 16px;
  }

  .line {
    font-size: 14px;
    margin-top: 10px;
    display: flex;
    line-height: 1.5;
  }

  .footer {
    margin-top: 8px;
    font-size: 12px;
    text-align: right;
  }
`;

import Skeleton from './Skeleton';

interface Props {
  wordLengths: number[];
  useFlex?: boolean;
}

/**
 * https://github.com/velopert/velog-client/blob/master/src/components/common/SkeletonTexts.tsx
 */
const SkeletonTexts = ({ wordLengths, useFlex }: Props) => {
  return (
    <>
      {wordLengths.map((length, index) => {
        const props = {
          [useFlex ? 'flex' : 'width']: useFlex ? length : `${length}rem`,
        };

        return <Skeleton key={index} {...props} />;
      })}
    </>
  );
};

export default SkeletonTexts;

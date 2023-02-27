import DefferredComponent from '~/components/common/DeferredComponent';
import Modal, { useModalContext } from '~/components/common/Modal';
import Skeleton, { SkeletonAnimation } from '~/components/common/Skeleton';

const Page = () => {
  const { open } = useModalContext();
  return (
    <div>
      <DefferredComponent>
        <SkeletonAnimation>
          <Skeleton className="h-3 w-20" />
        </SkeletonAnimation>
      </DefferredComponent>
    </div>
  );
};

export default Page;

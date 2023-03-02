import Skeleton from '../common/Skeleton';
import classNames from './Post.module.scss';

const ItemSkeleton = () => {
  return (
    <div className={classNames['list-item']}>
      {/** TODO - left: title, description; right: cover image */}
      <div className="flex flex-col gap-4 w-full">
        <div className={classNames['list-item__title']}>
          <Skeleton className="w-2/5 h-5" />
        </div>
        <div>
          <div className="space-x-2">
            <Skeleton className="w-1/6 h-4" />
            <Skeleton className="w-2/6 h-4" />
            <Skeleton className="w-2/6 h-4" />
          </div>
          <div className="space-x-2">
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-1/5 h-4" />
            <Skeleton className="w-2/5 h-4" />
          </div>
        </div>
      </div>
      <div className="">
        <Skeleton animate="none" className="w-48 h-full" />
      </div>
    </div>
  );
};

export default ItemSkeleton;

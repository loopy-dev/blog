import DefferredComponent from '../common/DeferredComponent';
import Skeleton from '../common/Skeleton';

const ItemSkeleton = () => {
  return (
    <DefferredComponent>
      <div className="flex gap-2 border rounded-md flex-col-reverse sm:flex-row">
        {/** TODO - left: title, description; right: cover image */}
        <div className="flex flex-col gap-4 w-full p-4 sm:p-8">
          <div>
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
    </DefferredComponent>
  );
};

export default ItemSkeleton;

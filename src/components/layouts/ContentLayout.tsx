import type { HTMLAttributes } from 'react';

const ContentLayout = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return <div className="mx-auto max-w-4xl sm:p-8 p-4" {...props} />;
};

export default ContentLayout;

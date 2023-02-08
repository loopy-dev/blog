import type { HTMLAttributes } from 'react';

const ContentLayout = ({ ...props }: HTMLAttributes<HTMLElement>) => {
  return <div className="mx-auto max-w-4xl p-8" {...props} />;
};

export default ContentLayout;

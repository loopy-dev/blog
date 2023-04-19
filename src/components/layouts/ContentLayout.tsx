import type { HTMLAttributes } from 'react';
import classnames from 'classnames/bind';
import css from './ContentLayout.module.css';

const cx = classnames.bind(css);

const ContentLayout = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cx('content-layout')}>
      {children}
    </div>
  );
};

export default ContentLayout;

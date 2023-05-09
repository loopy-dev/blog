import React from 'react';
import type { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './SideBar.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  isOpen?: boolean;
}

// TODO - width 유동적으로 받을 수 있도록 처리하기
const SideBar = (
  { width = 320, children, className, isOpen, ...props }: Props,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <div
      ref={ref}
      className={classNames(
        styles['sidebar-container'],
        {
          'pointer-events-none': !isOpen,
          'cursor-pointer': isOpen,
          invisible: !isOpen,
          visible: isOpen,
          'bg-[color:rgba(0, 0, 0, 0.08)]': isOpen,
        },
        className
      )}
    >
      <div
        className={classNames(
          styles.sidebar,
          `w-[400px]`,
          'bg-green-400',
          {
            '-translate-x-[400px]': isOpen,
          },
          'bg-[color:var(--bg-page2)]'
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(SideBar);

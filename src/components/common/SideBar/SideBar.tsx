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
          [styles['sidebar-container__open']]: isOpen,
          [styles['sidebar-container__close']]: !isOpen,
        },
        className
      )}
    >
      {/** TODO - prop으로 받을 수 있도록 하기 */}
      <div
        className={classNames(
          styles.sidebar,
          `w-[400px]`,
          {
            '-translate-x-[400px]': isOpen,
          },
          {
            [styles['sidebar__open']]: isOpen,
          }
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default React.forwardRef(SideBar);

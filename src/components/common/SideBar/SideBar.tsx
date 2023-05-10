import React, { useRef, useEffect, useState } from 'react';
import type { HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './SideBar.module.scss';
import { useSideBarContext } from './SideBarContext';

interface Props extends HTMLAttributes<HTMLDivElement> {
  width?: number;
}

// TODO - width 유동적으로 받을 수 있도록 처리하기
const SideBar = ({ width = 320, children, className, ...props }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isOpen, close } = useSideBarContext();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    setIsSideBarOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const current = ref.current;

    const callback = (e: MouseEvent) => {
      if (e.target !== e.currentTarget) return;

      close();
    };

    current?.addEventListener('click', callback);

    return () => {
      current?.removeEventListener('click', callback);
    };
  }, [close]);

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
            '-translate-x-[400px]': isSideBarOpen,
          },
          {
            [styles['sidebar__open']]: isSideBarOpen,
          }
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default SideBar;

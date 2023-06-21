import type { HTMLAttributes } from 'react';
import { useEffect } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaAngleDown } from 'react-icons/fa';
import { Dropdown, DropdownTrigger } from '~components/common/Dropdown';
import { useDropdownContext } from '~components/common/Dropdown/Dropdown';
import styles from '../Post.module.scss';
import type { Series as SeriesType } from '~models/Post';

interface Props {
  series: SeriesType;
}

// TODO - onRouteChange -> close
const PostSeries = ({ series }: Props) => {
  return (
    <div className={styles.series}>
      <Dropdown
        className={classNames(
          'shadow-md',
          'mt-16',
          'bg-white',
          'dark:bg-zinc-700',
          'rounded'
        )}
        dropdownTrigger={(isOpen) => (
          <DropdownTrigger
            className={classNames(
              'p-4',
              'cursor-pointer',
              'rounded',
              'transition-all',
              {
                'rounded-b-none': isOpen,
              }
            )}
          >
            <div
              className={classNames(
                'flex',
                'justify-between',
                'items-center',
                'w-full',
                'gap-4'
              )}
            >
              <h3
                className={classNames(
                  'font-medium',
                  'sm:text-xl',
                  'overflow-hidden',
                  'text-ellipsis',
                  'whitespace-nowrap'
                )}
              >
                {series.title}
              </h3>
              <span
                className={classNames(
                  {
                    'rotate-180': isOpen,
                  },
                  'text-lg',
                  'transition-all',
                  'select-none',
                  'pointer-events-none'
                )}
              >
                <FaAngleDown />
              </span>
            </div>
            <p
              className={classNames(
                'text-xs',
                'sm:text-sm',
                'text-zinc-400',
                'mt-2'
              )}
            >
              시리즈에 {series.items.length}개의 글 포함됨
            </p>
          </DropdownTrigger>
        )}
      >
        <DropdownMenu className={classNames('rounded-b', 'py-2')}>
          {series.items.map((item, index) => (
            <li
              key={item.url}
              className={classNames(
                'flex',
                'gap-4',
                'py-1',
                'px-4',
                'leading-normal'
              )}
            >
              <span
                className={classNames(
                  'font-mono',
                  'italic',
                  'text-zinc-300',
                  'select-none'
                )}
              >
                {index + 1}.
              </span>
              <Link
                className={classNames('hover:underline')}
                href={`/posts/${item.url}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default PostSeries;

const DropdownMenu = ({
  children,
  ...props
}: HTMLAttributes<HTMLUListElement>) => {
  const { isOpen, close } = useDropdownContext();
  const router = useRouter();

  useEffect(() => {
    const callback = () => {
      close();
    };

    router.events.on('routeChangeComplete', callback);

    return () => {
      router.events.off('routeChangeComplete', callback);
    };
  }, [close, router.events]);
  return !isOpen ? null : <ul {...props}>{children}</ul>;
};

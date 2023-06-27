import { useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { FaAngleLeft, FaAngleDown } from 'react-icons/fa';
import { setElementId } from '../utils';
import useHeadings from './useHeadings';

interface Props {
  category?: string;
}

/**
 *
 * PostNavbar에 들어갈 컨텐트
 * 1. 목록으로 이동하는 기능
 * 2. 본문 Navigator 역할
 */
const PostNavbar = ({ category = 'posts' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selector = '.post-content';
  const headings = useHeadings(selector);

  return (
    <div
      className={classNames(
        'relative',
        'sticky',
        'top-0',
        'left-0',
        'bg-white',
        'dark:bg-zinc-900',
        { shadow: !isOpen },
        'z-20'
      )}
    >
      <div
        className={classNames(
          'flex',
          'justify-between',
          'items-center',
          'sm:hidden',
          'px-4',
          'py-2'
        )}
      >
        <Link
          href={`/${category}`}
          className={classNames(
            'flex',
            'items-center',
            'text-zinc-500',
            'dark:text-zinc-200',
            'hover:text-zinc-900',
            'gap-1'
          )}
        >
          <FaAngleLeft />
          리스트
        </Link>
        <div
          className={classNames(
            'flex',
            'items-center',
            'text-zinc-500',
            'dark:text-zinc-200',
            'hover:text-zinc-900',
            'gap-1'
          )}
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          본문 내 이동
          <FaAngleDown
            className={classNames(
              {
                'rotate-180': isOpen,
              },
              'transition-all'
            )}
          />
        </div>
      </div>
      <div
        className={classNames(
          {
            hidden: !isOpen,
            shadow: isOpen,
          },
          'w-full',
          'py-2',
          'absolute',
          'bg-white',
          'dark:bg-zinc-900',
          'text-[90%]'
        )}
      >
        <ul className={classNames('max-h-[280px]', 'overflow-auto')}>
          {headings.map((heading) => (
            <li
              key={heading.textContent}
              className={classNames(
                'w-full',
                'px-4',
                'py-0.5',
                'text-[color:var(--primary-variant)]'
              )}
              style={{
                paddingLeft:
                  heading.tagName === 'H2'
                    ? '32px'
                    : heading.tagName === 'H3'
                    ? '48px'
                    : '16px',
              }}
            >
              <a
                className={classNames('hover:underline')}
                href={`#${setElementId(heading.textContent)}`}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {heading.textContent}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PostNavbar;

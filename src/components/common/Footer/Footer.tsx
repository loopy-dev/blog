import classNames from 'classnames';
import Link from 'next/link';
import { FaCommentDots, FaGithubSquare, FaUserCircle } from 'react-icons/fa';
import { ImBlog } from 'react-icons/im';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';

const Footer = () => {
  return (
    <footer className={classNames('min-h-[150px]', 'shadow-inner', 'text-xl')}>
      <div
        className={classNames(
          'max-w-[44rem]',
          'h-full',
          'mx-auto',
          'flex',
          'flex-col',
          'sm:flex-row',
          'gap-6',
          'justify-around',
          'items-center',
          'py-8'
        )}
      >
        <Link
          href="/"
          className={classNames(
            'font-medium',
            'flex',
            'flex-row',
            'sm:flex-col',
            'gap-1'
          )}
        >
          <p>{"© Ben's"}</p>
          <p>Devlog</p>
        </Link>
        <ul
          className={classNames(
            'flex',
            'justify-center',
            'items-center',
            'flex-wrap',
            'gap-6',
            'text-2xl',
            'text-zinc-300'
          )}
        >
          <li
            className={classNames(
              'hover:text-zinc-900',
              'dark:hover:text-zinc-500'
            )}
          >
            <Link
              href="https://github.com/mrbartrns"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGithubSquare />
            </Link>
          </li>
          <li
            className={classNames(
              'hover:text-zinc-900',
              'dark:hover:text-zinc-500'
            )}
          >
            <Link
              href="https://velog.io/@mrbartrns"
              rel="noopener noreferrer"
              target="_blank"
            >
              <ImBlog />
            </Link>
          </li>
          <li
            className={classNames(
              'hover:text-zinc-900',
              'dark:hover:text-zinc-500'
            )}
          >
            <Link href="/discussion">
              <FaCommentDots />
            </Link>
          </li>
          <li
            className={classNames(
              'hover:text-zinc-900',
              'dark:hover:text-zinc-500'
            )}
          >
            <Link
              href="https://noble-fisherman-5cc.notion.site/00ca620933e94941900f26f317786c43"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaUserCircle />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

export const Item = styled.div`
  user-select: none;
  transition: all 100ms cubic-bezier(0.31, 0.27, 0.15, 0.99) 0s;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;
  text-align: center;

  &:hover {
    color: ${cssVar('primary_light')};
  }
`;

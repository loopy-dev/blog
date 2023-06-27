import classNames from 'classnames';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

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
  return (
    <div>
      <div
        className={classNames(
          'flex',
          'justify-between',
          'items-center',
          'sm:hidden',
          'sticky',
          'top-0',
          'left-0',
          'px-4',
          'py-2',
          'z-20',
          'bg-white',
          'dark:bg-zinc-900',
          'shadow'
        )}
      >
        <Link
          href={`/${category}`}
          className={classNames(
            'flex',
            'items-center',
            'text-zinc-400',
            'hover:text-zinc-900',
            'gap-1'
          )}
        >
          <FaArrowLeft />
          리스트
        </Link>
        <div>본문 내 이동</div>
      </div>
    </div>
  );
};

export default PostNavbar;

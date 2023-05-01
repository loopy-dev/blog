import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import ContentLayout from '~components/layouts/ContentLayout';

const Banner = () => {
  return (
    <ContentLayout>
      <div
        className={classNames(
          'flex',
          'flex-col',
          'gap-4',
          'justify-center',
          'items-center'
        )}
      >
        <Image
          priority
          alt="ben"
          height={0}
          src="/nyan-cat.gif"
          style={{ width: '100%', height: 'auto', marginLeft: '10%' }}
          width={0}
        />
        <div>
          <p className={classNames('leading-[1.75]', 'mt-6')}>
            Benlog는 현재 공사중이에요.{' '}
            <Link
              href="/posts"
              className={classNames(
                'text-[color:var(--primary-variant)]',
                'hover:underline'
              )}
            >
              Posts
            </Link>
            를 눌러 글을 볼 수 있어요.
          </p>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Banner;

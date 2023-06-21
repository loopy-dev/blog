import classNames from 'classnames';
import styles from '../Post.module.scss';

interface Props {
  content: React.ReactNode;
  aside?: React.ReactNode;
  showAsideOnMobile?: boolean;
  orderAsideFirst?: boolean;
}

const PostTemplate = ({
  content,
  aside,
  showAsideOnMobile,
  orderAsideFirst,
}: Props) => {
  return (
    <div
      className={classNames(
        'flex',
        'flex-col',
        'lg:flex-row',
        'w-full',
        'justify-between',
        'relative',
        'max-w-screen-lg',
        'mx-auto',
        'items-start',
        'block'
      )}
    >
      <article
        className={classNames(
          'w-full',
          'max-w-[44rem]',
          'mx-auto',
          styles.article
        )}
      >
        {content}
      </article>
      {aside ? (
        <aside
          className={classNames(
            'lg:sticky',
            'lg:mt-[10%]',
            'lg:block',
            'lg:w-[300px]',
            'max-w-[44rem]',
            'mx-auto',
            'p-6',
            'top-[20%]',
            'lg:order-none',
            {
              'order-first': orderAsideFirst,
            },
            {
              hidden: !showAsideOnMobile,
            }
          )}
        >
          {aside}
        </aside>
      ) : null}
    </div>
  );
};

export default PostTemplate;

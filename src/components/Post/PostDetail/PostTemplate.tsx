import classNames from 'classnames';

interface Props {
  content: React.ReactNode;
  aside?: React.ReactNode;
}

const PostTemplate = ({ content, aside }: Props) => {
  return (
    <div
      className={classNames(
        'lg:flex',
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
        className={classNames('p-6', 'w-full', 'max-w-[44rem]', 'mx-auto')}
      >
        {content}
      </article>
      {aside ? (
        <aside
          className={classNames(
            'sticky',
            'mt-[20%]',
            'p-6',
            'w-[300px]',
            'hidden',
            'lg:block',
            'top-[20%]'
          )}
        >
          {aside}
        </aside>
      ) : null}
    </div>
  );
};

export default PostTemplate;

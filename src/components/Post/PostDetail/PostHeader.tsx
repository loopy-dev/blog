import classNames from 'classnames';
import styles from '../Post.module.scss';
import type { FrontMatter } from '~/models/Post';
interface Props {
  postMetaData: FrontMatter;
}

const PostHeader = ({ postMetaData }: Props) => {
  const date = new Date(postMetaData.createdTime);
  const postDate = `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;

  return (
    <div className={classNames('my-16', styles.header)}>
      <div className={classNames('title', 'mt-8', 'mb-[1.21875em]')}>
        <h1
          className={classNames(
            'w-full',
            'max-w-full',
            'tracking-[-0.03em]',
            'whitespace-pre-wrap',
            'break-words',
            'font-bold',
            'text-[3em]',
            'leading-[1.3]',
            'mt-[1em]'
          )}
        >
          {postMetaData.title}
        </h1>
      </div>
      <div className={classNames('meta', 'flex', 'justify-between')}>
        <p className="w-full">
          by <span className="font-bold">mrbartrns</span>
        </p>
        <p
          className={classNames(
            'w-full',
            'text-right',
            'text-[color:var(--text2)]',
            'italic'
          )}
        >
          {postDate}
        </p>
      </div>
    </div>
  );
};

export default PostHeader;

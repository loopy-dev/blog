import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getPostComments } from '~/lib/api/post';
import { SideBarProvider, useSideBarContext } from '~components/common/SideBar';
import SideBar from '~components/common/SideBar';
import Icon from '~components/icons';
import CommentIcon from '~components/icons/CommentIcon';
import Comments from './Comments';

interface Props {
  url: string;
}

/** comments
 * NOTE - Suspense(dynamic) block이 내부에 존재한다면 hydration error가 발생
 */
const PostFooter = ({ url }: Props) => {
  const { open, close } = useSideBarContext();
  const [commentCounts, setCommentCounts] = useState<string | number>('...');

  useEffect(() => {
    (async () => {
      const comments = await getPostComments(url);
      setCommentCounts(comments.comments);
    })();
  }, [url]);
  return (
    <div className={classNames('mt-8')}>
      <Comments className="block md:hidden" />
      <div
        className={classNames(
          'inline-flex',
          'gap-0.5',
          'justify-between',
          'items-center',
          'text-[color:var(--text4)]',
          'fill-[color:var(--text4)]',
          'hover:text-[color:var(--text3)]',
          'hover:fill-[color:var(--text3)]',
          'cursor-pointer'
        )}
        onClick={() => {
          open();
        }}
      >
        {/** TODO - refactor Icon */}
        <span>
          <CommentIcon />
        </span>
        <span>{commentCounts}</span>
      </div>
      {/** sidebar */}
      <SideBar className="hidden md:block">
        <div className="mt-20 p-4">
          <div
            className={classNames('flex', 'justify-between', 'items-center')}
          >
            <h3
              className={classNames(
                'leading-normal',
                'font-medium',
                'text-2xl'
              )}
            >
              댓글
            </h3>
            <Icon
              className={classNames('cursor-pointer')}
              type="close"
              onClick={() => {
                close();
              }}
            />
          </div>
          <Comments />
        </div>
      </SideBar>
    </div>
  );
};

const PostFooterWithProvider = ({ url }: Props) => {
  return (
    <SideBarProvider>
      <PostFooter url={url} />
    </SideBarProvider>
  );
};

export default PostFooterWithProvider;

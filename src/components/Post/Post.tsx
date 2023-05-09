import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { getPostComments } from '~/lib/api/post';
import SideBar from '~components/common/SideBar';
import Icon from '~components/icons';
import CommentIcon from '~components/icons/CommentIcon';
import Comments from './Comments';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostTemplate from './PostTemplate';
import type { FrontMatter, Post as PostModel } from '~/models/Post';

interface Props {
  post: PostModel;
}

const PostAside = dynamic(() => import('./PostAside'), { ssr: false });

const Post = ({ post }: Props) => {
  const frontMatter: FrontMatter = {
    title: post.title,
    url: post.url,
    tags: post.tags,
    description: post.description,
    createdTime: post.createdTime,
  };

  const [open, setOpen] = useState(false);
  const [commentCounts, setCommentCounts] = useState<string | number>('...');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const current = ref.current;

    const callback = (e: MouseEvent) => {
      if (e.target !== e.currentTarget) return;

      setOpen(false);
    };

    current?.addEventListener('click', callback);

    return () => {
      current?.removeEventListener('click', callback);
    };
  }, []);

  useEffect(() => {
    (async () => {
      const comments = await getPostComments(post.url);
      setCommentCounts(comments.comments);
    })();
  }, [post.url]);

  return (
    <PostTemplate
      aside={<PostAside />}
      content={
        <>
          <PostHeader postMetaData={{ ...frontMatter }} />
          <PostContent content={post.content} />
          {/** comments */}
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
                setOpen(true);
              }}
            >
              {/** TODO - refactor Icon */}
              <span>
                <CommentIcon />
              </span>
              <span>{commentCounts}</span>
            </div>
            {/** sidebar */}
            <SideBar ref={ref} className="hidden md:block" isOpen={open}>
              <div className="mt-20 p-4">
                <div
                  className={classNames(
                    'flex',
                    'justify-between',
                    'items-center'
                  )}
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
                      setOpen(false);
                    }}
                  >
                    창 닫기
                  </Icon>
                </div>
                <Comments />
              </div>
            </SideBar>
          </div>
        </>
      }
    />
  );
};

export default Post;

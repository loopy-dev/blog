import type { HTMLAttributes } from 'react';
import { useEffect, useRef } from 'react';
import classNames from 'classnames';

// Comment system uses github utterances.

const Comments = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  const commentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const $script = document.createElement('script');
    $script.async = true;
    $script.crossOrigin = 'anonymous';
    $script.setAttribute('src', 'https://utteranc.es/client.js');
    $script.setAttribute('issue-term', 'pathname');
    $script.setAttribute('label', 'Comment');
    $script.setAttribute('theme', 'github-light');
    $script.setAttribute('repo', 'mrbartrns/blog');

    commentRef.current?.appendChild($script);
  }, []);
  return (
    <section
      ref={commentRef}
      className={classNames('mt-6', className)}
      {...props}
    />
  );
};

export default Comments;

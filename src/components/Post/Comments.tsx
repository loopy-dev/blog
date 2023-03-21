import { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Comment system uses github utterances.
const Comments = () => {
  const commentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const $script = document.createElement('script');
    $script.async = true;
    $script.crossOrigin = 'anonymous';
    $script.setAttribute('src', 'https://utteranc.es/client.js');
    $script.setAttribute('issue-term', 'title');
    $script.setAttribute('label', 'Comment');
    $script.setAttribute('theme', 'github-light');
    $script.setAttribute('repo', 'mrbartrns/blog');

    commentRef.current?.appendChild($script);
  }, []);
  return <Section ref={commentRef} />;
};

export default Comments;

const Section = styled.section`
  margin-top: 1.5rem;
`;

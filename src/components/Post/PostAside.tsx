import { useEffect, useState } from 'react';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import { setElementId } from './utils';

const PostAside = () => {
  const [heads, setHeads] = useState<HTMLHeadingElement[]>([]);

  useEffect(() => {
    const $content = document.querySelector('.post-content');

    if (!$content) return;

    const $headings = [
      ...Array.from($content.querySelectorAll('h1')),
      ...Array.from($content.querySelectorAll('h2')),
      ...Array.from($content.querySelectorAll('h3')),
    ].sort(
      (a, b) => (Number(a.dataset.index) ?? 0) - (Number(b.dataset.index) ?? 0)
    );

    setHeads($headings);
  }, []);

  return (
    <Container>
      {heads.map((head) => (
        <li
          key={head.textContent}
          style={{
            paddingLeft:
              head.tagName === 'H2'
                ? '8px'
                : head.tagName === 'H3'
                ? '16px'
                : 0,
          }}
        >
          <a href={`#${setElementId(head.textContent)}`}>{head.textContent}</a>
        </li>
      ))}
    </Container>
  );
};

export default PostAside;

const Container = styled.ul`
  width: 100%;

  color: ${cssVar('primary_variant')};

  & li {
    font-size: 90%;
    line-height: 1.7;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

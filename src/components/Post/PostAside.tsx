import { useEffect, useState } from 'react';
import classNames from 'classnames';
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
    <ul className={classNames('w-full', 'text-[color:var(--primary-variant)]')}>
      {heads.map((head) => (
        <li
          key={head.textContent}
          className={classNames('text-[90%]', 'leading-[1.7]')}
          style={{
            paddingLeft:
              head.tagName === 'H2'
                ? '8px'
                : head.tagName === 'H3'
                ? '16px'
                : 0,
          }}
        >
          <a
            className={classNames('hover:underline')}
            href={`#${setElementId(head.textContent)}`}
          >
            {head.textContent}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PostAside;

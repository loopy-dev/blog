import { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { setElementId } from '../utils';

const PostAside = () => {
  const [heads, setHeads] = useState<HTMLHeadingElement[]>([]);
  const headingsRef = useRef<IntersectionObserverEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const getHeadings = useCallback(() => {
    const $content = document.querySelector('.post-content');

    if (!$content) return [];

    const $headings = [
      ...Array.from($content.querySelectorAll('h1')),
      ...Array.from($content.querySelectorAll('h2')),
      ...Array.from($content.querySelectorAll('h3')),
    ];

    return $headings;
  }, []);

  useEffect(() => {
    const $headings = getHeadings().sort(
      (a, b) => (Number(a.dataset.index) ?? 0) - (Number(b.dataset.index) ?? 0)
    );

    // element
    setHeads($headings);
  }, [getHeadings]);

  // TODO - multi el-ref intersection observer 추상화
  useEffect(() => {
    const $headings = getHeadings();

    const callback: IntersectionObserverCallback = (entries) => {
      headingsRef.current = [...entries];
      const visibleHeadings: IntersectionObserverEntry[] = [];

      headingsRef.current.forEach((head) => {
        if (head.isIntersecting) {
          visibleHeadings.push(head);
        }
      });

      visibleHeadings.sort(
        (a, b) =>
          Number((a.target as HTMLElement).dataset.index) -
          Number((b.target as HTMLElement).dataset.index)
      );

      if (visibleHeadings.length > 0) {
        setActiveIndex(
          Number((visibleHeadings[0].target as HTMLElement).dataset.index)
        );
      }
    };

    const io = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -300px 0px',
      threshold: 1,
    });

    $headings.forEach((heading) => {
      io.observe(heading);
    });

    return () => {
      io.disconnect();
    };
  }, [getHeadings]);

  return (
    <ul className={classNames('w-full', 'text-[color:var(--primary-variant)]')}>
      {heads.map((head) => (
        <li
          key={head.textContent}
          className={classNames('text-[90%]', 'leading-[1.7]', {
            'font-bold': activeIndex === Number(head.dataset.index),
          })}
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

import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { setElementId } from '../utils';
import { getHeadings } from '../utils';
import useHeadings from './useHeadings';

const PostAside = () => {
  const headingsRef = useRef<IntersectionObserverEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selector = '.post-content';
  const heads = useHeadings(selector);

  // TODO - multi el-ref intersection observer 추상화
  useEffect(() => {
    const $headings = getHeadings(selector);

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
  }, []);

  return (
    <ul className={classNames('w-full', 'text-[color:var(--primary-variant)]')}>
      {heads.map((head) => (
        <li
          key={`${head.textContent}-${head.dataset.index}`}
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
            href={`#${setElementId(head.textContent)}-${head.dataset.index}`}
          >
            {head.textContent}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PostAside;

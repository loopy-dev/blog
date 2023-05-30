import { useState } from 'react';
import classNames from 'classnames';
import Button from '~components/common/Button';
import Tag from '~components/common/Tag';
import type { FrontMatter } from '~models/Post';

interface Props {
  posts: FrontMatter[];
  onClick?: (tagName: string) => void;
  onReset?: () => void;
}

/**
 * @description
 * FrontMatter Props을 받아 Tag list를 보여준다.
 *
 */
const TagList = ({ posts, onClick, onReset }: Props) => {
  /**
   * ```tsx
   * const tags = { tagName: [1, false] }
   * ```
   */
  const [tags, setTags] = useState(
    posts.reduce((acc, cur) => {
      const tags = cur.tags;

      tags.forEach((tag) => {
        if (Object.hasOwn(acc, tag)) {
          acc[tag][0] += 1;
        } else {
          acc[tag] = [1, false];
        }
      });

      return acc;
    }, {} as Record<string, [number, boolean]>)
  );

  const toggleSelected = (tagName: string) => {
    setTags((prev) => {
      if (!Object.hasOwn(prev, tagName)) return prev;

      const ret = { ...prev };
      ret[tagName][1] = !ret[tagName][1];
      return ret;
    });
  };

  const clearSelected = () => {
    setTags((prev) => {
      const ret = { ...prev };
      Object.keys(ret).forEach((key) => {
        ret[key][1] = false;
      });
      return ret;
    });
  };

  return (
    <div className={classNames('border', 'rounded-lg', 'p-4')}>
      <div className={classNames('flex', 'justify-between', 'items-center')}>
        <h4 className={classNames('font-medium')}>태그별로 모아보기</h4>
        <Button
          borderStyle="none"
          shape="rounded"
          size="xs"
          variant="transparent"
          onClick={() => {
            clearSelected();
            onReset?.();
          }}
        >
          <span className={classNames('text-[color:var(--primary-variant)]')}>
            초기화
          </span>
        </Button>
      </div>
      <div
        className={classNames('flex', 'w-full', 'flex-wrap', 'gap-2', 'mt-4')}
      >
        {Object.entries(tags).map(([key, [count, selected]]) => (
          <Tag
            key={key}
            label={`${key}: ${count}`}
            selected={selected}
            onClick={() => {
              // toggle tag
              toggleSelected(key);
              // callback function
              onClick?.(key);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagList;

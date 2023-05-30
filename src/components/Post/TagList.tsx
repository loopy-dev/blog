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
  const tags = posts.reduce((acc, cur) => {
    const tags = cur.tags;

    tags.forEach((tag) => {
      if (Object.hasOwn(acc, tag)) {
        acc[tag] += 1;
      } else {
        acc[tag] = 1;
      }
    });

    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h4 className={classNames('font-medium')}>태그별로 모아보기</h4>
      <p
        className={classNames(
          'text-sm',
          'text-[color:var(--primary-variant)]',
          'mt-2'
        )}
      >
        태그를 클릭하면 해당 태그가 포함된 글들만 모아볼 수 있어요.
      </p>
      <div>
        <Button
          borderStyle="none"
          shape="rounded"
          size="xs"
          variant="transparent"
          onClick={() => {
            onReset?.();
          }}
        >
          초기화
        </Button>
      </div>
      <div
        className={classNames('flex', 'w-full', 'flex-wrap', 'gap-2', 'mt-4')}
      >
        {Object.entries(tags).map(([key, value]) => (
          <Tag
            key={key}
            label={`${key}: ${value}`}
            onClick={() => {
              onClick?.(key);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagList;

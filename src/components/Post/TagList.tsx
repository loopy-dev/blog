import classNames from 'classnames';
import Tag from '~components/common/Tag';
import type { FrontMatter } from '~models/Post';

interface Props {
  posts: FrontMatter[];
}

/**
 * @description
 * FrontMatter Props을 받아 Tag list를 보여준다.
 *
 */
const TagList = ({ posts }: Props) => {
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
    <div className={classNames('flex', 'w-full', 'flex-wrap', 'gap-2')}>
      {Object.entries(tags).map(([key, value]) => (
        <Tag key={key} label={`${key}: ${value}`} />
      ))}
    </div>
  );
};

export default TagList;

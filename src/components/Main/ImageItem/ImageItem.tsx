import classNames from 'classnames';
import BackgroundImage from '~components/common/BackgroundImage';
import type { FrontMatter } from '~models/Post';

interface Props {
  post: FrontMatter;
}

const ImageItem = ({ post }: Props) => {
  return (
    <BackgroundImage
      altImage="linear-gradient(90deg,rgba(9, 121, 113, 1) 0%,rgba(0, 212, 255, 1) 82%)"
      // TEST
      blockHeight="300px"
      imageUrl={
        post.coverImage ? post.coverImage : 'https://picsum.photos/1600/900'
      }
    >
      <div
        // TODO - 스타일 수정 필요함
        style={{ minHeight: 'inherit' }}
        className={classNames(
          'absolute',
          'bottom-0',
          'flex',
          'flex-col',
          'justify-end',
          'gap-4',
          'p-4'
        )}
      >
        <h1 className={classNames('text-4xl', 'text-white', 'drop-shadow')}>
          {post.title}
        </h1>
        <p
          className={classNames(
            'text-white',
            'whitespace-nowrap',
            'overflow-hidden',
            'text-ellipsis',
            'drop-shadow'
          )}
        >
          {post.description}
        </p>
      </div>
    </BackgroundImage>
  );
};

export default ImageItem;

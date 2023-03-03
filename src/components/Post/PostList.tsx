import ListItem from './ListItem';
import type { PostMetaData } from '~/models/Post';

interface Props {
  posts: PostMetaData[];
}

const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <ListItem key={post.id} post={post} />
      ))}
    </>
  );
};

export default PostList;

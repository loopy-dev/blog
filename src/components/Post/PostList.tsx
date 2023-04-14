import ListItem from './ListItem';
import type { FrontMatter } from '~models/Post';

interface Props {
  posts: FrontMatter[];
}

const PostList = ({ posts }: Props) => {
  return (
    <>
      {posts.map((post) => (
        <ListItem key={post.title} post={post} />
      ))}
    </>
  );
};

export default PostList;

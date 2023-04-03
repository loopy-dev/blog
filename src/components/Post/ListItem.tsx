import Link from 'next/link';
import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import Tag from '../common/Tag';
import type { FrontMatter } from '~models/Post';

interface Props {
  post: FrontMatter;
}

// TODO - add props
const ListItem = ({ post }: Props) => {
  return (
    <Container href={`/posts/${post.title}`}>
      <PostTitle>{post.title}</PostTitle>
      <PostTags>
        {post.tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.preventDefault();
            }}
          />
        ))}
      </PostTags>
      <Description>{post.description}</Description>
      <TimeStamp>{post.createdTime}</TimeStamp>
    </Container>
  );
};

export default ListItem;

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 4px 0 12px;
  min-height: 150px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  // TODO - need color change in dark mode
  /* &:hover {
    background-color: rgb(249 250 251);
  } */

  &:last-of-type {
    border-bottom: none;
  }
`;

const PostTitle = styled.h3`
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 1.5rem;
  margin-bottom: 0.3rem;
  letter-spacing: -1px;
  line-height: 1.3;
`;

const PostTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: nowrap;
  overflow-x: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Description = styled.p`
  margin-bottom: 0.8125rem;
  color: ${cssVar('text3')};
  font-size: 90%;
  line-height: 1.3;
`;

const TimeStamp = styled.p`
  text-align: right;
  color: ${cssVar('text3')};
  font-size: 12px;
  line-height: 1.3;
`;

import styled from 'styled-components';
import cssVar from '~/lib/styles/cssVar';
import type { FrontMatter } from '~/models/Post';

interface Props {
  postMetaData: FrontMatter;
}

const PostHeader = ({ postMetaData }: Props) => {
  const date = new Date(postMetaData.createdTime);

  return (
    <div className="my-16">
      <div
        className="title"
        style={{ marginTop: '2rem', marginBottom: '1.21875em' }}
      >
        <Title>{postMetaData.title}</Title>
      </div>
      <div
        className="meta flex flex-row"
        style={{ justifyContent: 'space-between' }}
      >
        <p className="w-full">
          by <span className="font-bold">mrbartrns</span>
        </p>
        <PostDate>{`${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }-${
          date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        }`}</PostDate>
      </div>
    </div>
  );
};

export default PostHeader;

const Title = styled.h1`
  max-width: 100%;
  width: 100%;
  letter-spacing: -0.03em;
  white-space: pre-wrap;
  word-break: break-word;
  caret-color: rgb(55, 53, 47);
  font-weight: 700;
  font-size: 3em;
  line-height: 1.3;
  margin-top: 1em;
`;

const PostDate = styled.p`
  width: 100%;
  text-align: right;
  color: ${cssVar('text2')};
  font-style: italic;
`;

import notion from '~/services/notion';
import m2w from '~/services/notion/content';
import type { GetServerSideProps } from 'next';
import type { Post } from '~/models/Post';

interface Props {
  post: Post;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.params?.id;

    if (typeof id !== 'string')
      return {
        notFound: true,
      };

    const response = (await notion.pages.retrieve({ page_id: id })) as any;
    const mdblocks = await m2w.pageToMarkdown(id);
    const mdString = m2w.toMarkdownString(mdblocks);

    const post: Post = {
      object: 'page',
      cover: null,
      createdBy: response.created_by,
      createdTime: response.created_time,
      archived: response.archived,
      icon: null,
      id: response.id,
      title: response.properties['이름'].title[0].plain_text as string,
      lastEditedTime: response.last_edited_time,
      content: mdString,
    };

    return {
      props: {
        post,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const Page = ({ post }: Props) => {
  return <div>{JSON.stringify(post)}</div>;
};

export default Page;

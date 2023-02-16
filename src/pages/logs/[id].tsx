import { useEffect } from 'react';
import notion from '../../services/notion';
import type { GetServerSideProps } from 'next';

interface Props {
  post: any;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const id = context.params?.id;

    if (typeof id !== 'string')
      return {
        notFound: true,
      };
    const response = await notion.pages.retrieve({ page_id: id });

    return {
      props: {
        post: response,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const Page = (props: Props) => {
  useEffect(() => {
    console.log(props.post);
  }, [props.post]);
  return <div>SubPage</div>;
};

export default Page;

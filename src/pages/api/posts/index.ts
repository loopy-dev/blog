// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import postService from '~/services/post';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await postService.getPostListMetaData();

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import path from 'path';
import PostService from '~/services/post';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const dir = path.resolve(__dirname, '../../../../content/posts');
    const postService = new PostService(dir);
    const posts = await postService.getPostList();

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

import path from 'path';
import PostService from '~/services/post';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const fileName = req.query.id;

  if (typeof fileName !== 'string') {
    return res.status(400).json({
      message: 'bad request.',
    });
  }

  try {
    const uri = decodeURI(fileName);
    const dir = path.resolve(__dirname, '../../../../../../content/posts');

    const postService = new PostService(dir);
    const file = postService.decode(`${uri}.md`);

    return res.status(200).json(file);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

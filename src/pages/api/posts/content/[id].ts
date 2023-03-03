import postService from '~/services/post';
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
    /** TEST */

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

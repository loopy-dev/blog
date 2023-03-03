import postService from '~/services/post';
import type { NextApiRequest, NextApiResponse } from 'next';

// temporary api for client side rendering

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fileName = req.query.id;

    if (typeof fileName !== 'string') {
      return res.status(400).json({
        message: 'bad request.',
      });
    }

    const uri = decodeURI(fileName);

    const response = await postService.decodeMetaData(`${uri}.md`);

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

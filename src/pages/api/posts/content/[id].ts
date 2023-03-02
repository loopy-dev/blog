import postService from '~/services/post';
import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id;

  if (typeof id !== 'string' || !apiKey)
    throw new Error('Missing notion api key or id.');

  try {
    const response = await postService.getPostMarkdown(id);

    return res.status(200).json(response);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

import notion from '../../notion';
import type { NextApiRequest, NextApiResponse } from 'next';

// temporary api for client side rendering
// TODO - change from CSR to SSR

const apiKey = process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    if (!id || !apiKey) throw new Error('Missing notion api key or id.');

    const response = notion.pages.retrieve({ page_id: id });
    console.log(response);

    return res.status(200).json(response);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

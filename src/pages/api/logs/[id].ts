import { NotionToMarkdown } from 'notion-to-md/build/notion-to-md';
import notion from '~services/notion';
import type { NextApiRequest, NextApiResponse } from 'next';

// temporary api for client side rendering
// TODO - change from CSR to SSR
const n2m = new NotionToMarkdown({ notionClient: notion });

const apiKey = process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string;
    if (!id || !apiKey) throw new Error('Missing notion api key or id.');

    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return res.status(200).json(mdString);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

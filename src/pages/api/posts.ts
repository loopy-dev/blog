// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import notion from '../../notion';
import type { NextApiRequest, NextApiResponse } from 'next';

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
const apiKey = process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!databaseId || !apiKey)
      throw new Error('Missing notion api key or DB id.');

    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: '공개',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return res.status(200).json(results);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

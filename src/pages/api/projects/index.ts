import notion from '~/lib/notion-server';
import type { NextApiRequest, NextApiResponse } from 'next';

const databaseId = 'b582301858734358ba3befb0470febaf';

// query a list
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  try {
    return res.status(200).json(response);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

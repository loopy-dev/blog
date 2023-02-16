// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import notion from '~services/notion';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PostListResponse } from '~/models/Post';

const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
const apiKey = process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!databaseId || !apiKey)
      throw new Error('Missing notion api key or DB id.');

    const { results } = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'published',
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts = results.map<PostListResponse>((result: any) => ({
      object: 'page',
      cover: null,
      createdBy: result.created_by,
      createdTime: result.created_time,
      archived: result.archived,
      icon: null,
      id: result.id,
      title: result.properties['이름'].title[0].plain_text as string,
      lastEditedTime: result.last_edited_time,
    }));

    return res.status(200).json(posts);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

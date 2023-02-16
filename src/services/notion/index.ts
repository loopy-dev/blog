import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NEXT_PUBLIC_PRIVATE_NOTION_API_KEY,
});

export default notion;

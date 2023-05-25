import axios from 'axios';
import { Base64 } from 'js-base64';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PostHits } from '~models/Post';

const isDevelopment = process.env.NODE_ENV === 'development';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url: pathname } = req.query;

  if (!pathname) {
    return res.status(400).json({
      message: 'bad request. post url is required.',
    });
  }

  if (isDevelopment) {
    return res.status(400).json({
      message: 'hit is not available on development mode.',
    });
  }

  const encoded = Base64.encodeURI(
    typeof pathname === 'string' ? pathname : pathname[0]
  );

  const url = `https://hits.dwyl.com/${process.env.GITHUB_ID}/${encoded}.json`;

  const response = await axios.get<PostHits>(url);

  return res.status(200).json(response.data);
};

export default handler;

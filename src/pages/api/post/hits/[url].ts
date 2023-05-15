import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PostHits } from '~models/Post';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { url: pathname } = req.query;

  if (!pathname) {
    return res.status(400).json({
      message: 'bad request. post url is required.',
    });
  }
  const url = `https://hits.dwyl.com/${process.env.GITHUB_ID}/${process.env.POST_PREFIX}-${pathname}.json`;

  const response = await axios.get<PostHits>(url);

  return res.status(200).json(response.data);
};

export default handler;

import { addDoc, collection } from '@firebase/firestore';
import { database } from '~services/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';

const feedbackCol = collection(database, 'feedback');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'bad request.' });
  }

  try {
    const { feedback } = req.body;
    if (!feedback) {
      return res.status(400).json({
        message: 'req.body(feedback) is required.',
      });
    }
    const response = await addDoc(feedbackCol, {
      ...feedback,
      createdTime: new Date().toUTCString(),
    });

    return res.status(200).json(response);
  } catch {
    return res.status(400).json({
      message: 'bad request.',
    });
  }
};

export default handler;

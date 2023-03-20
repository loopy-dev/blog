import { addDoc, collection } from 'firebase/firestore';
import { database } from '~services/firebase';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { CaptchaResponse, FeedbackForm } from '~models/Feedback';

const feedbackCol = collection(database, 'feedback');

const postFeedback = async (feedback: FeedbackForm) => {
  try {
    const response = await addDoc(feedbackCol, feedback);

    return response;
  } catch {
    throw new Error('error occurred at addFeedback.');
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { feedback, captcha } = req.body;

    if (req.method !== 'POST') {
      return res
        .status(400)
        .json({ message: 'handler only allows POST method.' });
    }

    if (!feedback || !captcha) {
      return res.status(400).json({
        message: 'Unproccesable request, please provide the required fields.',
      });
    }

    const captchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
      }
    ).then((response) => response.json() as Promise<CaptchaResponse>);

    if (captchaResponse.success) {
      await postFeedback(feedback);
      return res.status(200).json({ message: 'success.' });
    }

    return res
      .status(400)
      .json({ message: 'Unproccesable request, invalid captcha code.' });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'bad request.' });
  }
};

export default handler;

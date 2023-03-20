import type { NextApiRequest, NextApiResponse } from 'next';
import type { CaptchaResponse } from '~models/Feedback';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { captcha } = req.body;

    if (req.method !== 'POST') {
      return res
        .status(400)
        .json({ message: 'handler only allows POST method.' });
    }

    if (!captcha) {
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
      return res.status(200).json(captchaResponse);
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

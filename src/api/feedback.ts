import instance from './instance';
import type { FeedbackForm, CaptchaResponse } from '~models/Feedback';

export const postFeedback = async (feedback: FeedbackForm) => {
  try {
    const response = await instance.post('/api/feedback', { feedback });

    return response.data;
  } catch {
    throw new Error('error occurred at postFeedback.');
  }
};

export const verifyRecaptcha = async (token: string) => {
  try {
    const { data } = await instance.post<CaptchaResponse>('/api/verify', {
      captcha: token,
    });
    return data;
  } catch {
    throw new Error('error occurred at verifyRecaptcha.');
  }
};

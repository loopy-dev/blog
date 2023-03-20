import { addDoc, collection } from 'firebase/firestore';
import { database } from '../services/firebase';
import instance from './instance';
import type { FeedbackForm } from '../models/Feedback';

const feedbackCol = collection(database, 'feedback');

export async function postFeedback(feeback: FeedbackForm) {
  try {
    const response = await addDoc(feedbackCol, feeback);

    return response;
  } catch {
    throw new Error('error occurred at addFeedback.');
  }
}

export const postFeedbackWithCaptcha = async (
  feedback: FeedbackForm,
  captcha: string
) => {
  try {
    const response = await instance.post('/api/feedback', {
      feedback,
      captcha,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('error occurred at postFeedbackWithCaptcha');
  }
};

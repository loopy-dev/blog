import { addDoc, collection } from 'firebase/firestore';
import { database } from '../firebase';
import type { FeebackForm } from '../models/Feeback';

const feedbackCol = collection(database, 'feedback');

export async function postFeedback(feeback: FeebackForm) {
  try {
    const response = await addDoc(feedbackCol, feeback);

    return response;
  } catch {
    throw new Error('error occurred at addFeedback.');
  }
}

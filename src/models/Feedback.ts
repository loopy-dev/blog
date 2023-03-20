export interface Feedback {
  id: string;
  email: string;
  description: string;
  createdAt: string | number;
}

export interface CaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes': string[];
}

export type FeedbackForm = Pick<Feedback, 'email' | 'description'>;

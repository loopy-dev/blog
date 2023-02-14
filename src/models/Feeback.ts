export interface Feeback {
  id: string;
  email: string;
  description: string;
  createdAt: string | number;
}

export type FeebackForm = Pick<Feeback, 'email' | 'description'>;

// based on Notion api
export interface User {
  object: 'user';
  id: string;
}

export interface Icon {
  type: 'emoji';
  emoji: string;
}

type Timestamp = string;

export interface Post {
  id: string;
  object: 'page';
  cover: string | null;
  archived: boolean;
  createdBy: User;
  createdTime: Timestamp;
  lastEditedTime: Timestamp;
  icon: Icon | null;
  title: string;
  content: string;
  tags?: string[];
}

export type PostListResponse = Omit<Post, 'content'>;

export type PostContentResponse = Pick<Post, 'content'>;

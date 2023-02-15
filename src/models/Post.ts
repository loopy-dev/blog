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
  object: 'page';
  cover: string | null;
  archived: boolean;
  createdBy: User;
  createdTime: Timestamp;
  lastEditedTime: Timestamp;
  icon: Icon | null;
  title: string;
}

export interface Post {
  title: string;
  url: string;
  createdTime: string;
  tags: string[];
  description: string;
  content: string;
  series?: string;
}

export interface PostHits {
  color: string;
  label: string;
  message: string;
  schemaVersion: number;
  style: string;
}

export type FrontMatter = Omit<Post, 'content'>;

export interface Series {
  id: string;
  title: string;
  items: FrontMatter[];
}

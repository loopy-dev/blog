export interface Post {
  title: string;
  createdTime: string;
  tags: string[];
  description: string;
  content: string;
}

export type FrontMatter = Omit<Post, 'content'>;

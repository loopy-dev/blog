import type { FrontMatter } from '~models/Post';

// filtering functions
export const filterPostsBySelectedTags = (
  posts: FrontMatter[],
  selectedTags: string[]
) => {
  return posts.filter((post) => {
    const postTags = new Set(post.tags);
    return selectedTags.every((tag) => postTags.has(tag));
  });
};

export const filterPostsByKeywords = (
  posts: FrontMatter[],
  keywords: string
) => {
  return posts.filter(
    (post) =>
      post.title.includes(keywords) ||
      post.description.includes(keywords) ||
      post.tags.some((tag) => tag.includes(keywords))
  );
};

export const filterPostsByKeywordsAndTags = (
  posts: FrontMatter[],
  options?: {
    keywords?: string;
    selectedTags?: string[];
  }
) => {
  return options?.keywords
    ? filterPostsByKeywords(posts, options.keywords)
    : options?.selectedTags && options.selectedTags.length > 0
    ? filterPostsBySelectedTags(posts, options?.selectedTags)
    : posts;
};

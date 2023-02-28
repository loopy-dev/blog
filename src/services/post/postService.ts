import notion from '../notion';
import n2m from '../notion/content';
import type { Client } from '@notionhq/client';
import type { NotionToMarkdown } from 'notion-to-md';
import type { Post as PostInterface, PostMetaData } from '~/models/Post';

const getTitle = (result: any): string => {
  try {
    return result.properties['이름'].title[0].plain_text;
  } catch {
    return '';
  }
};

const getDescription = (result: any): string => {
  try {
    return result.properties.description.rich_text[0].plain_text;
  } catch {
    return '';
  }
};
/**
 * @description
 * parse post from notion client and notion to markdown.
 * this class is notion, notion-to-md dependent.
 */
class Post {
  private client: Client;
  private parser: NotionToMarkdown;

  constructor(client: Client, parser: NotionToMarkdown) {
    this.client = client;
    this.parser = parser;
  }

  async retrievePosts(databaseId: string): Promise<PostMetaData[]> {
    const { results } = await this.client.databases.query({
      database_id: databaseId,
      filter: {
        property: 'published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return results.map(this.decodeMetaData);
  }

  async getMetaData(postId: string): Promise<PostMetaData> {
    const response = await this.client.pages.retrieve({ page_id: postId });
    return this.decodeMetaData(response);
  }

  async getPostMarkdown(postId: string): Promise<string> {
    const response = await this.parser.pageToMarkdown(postId);
    const mdString = this.parser.toMarkdownString(response);

    return mdString;
  }

  async getFullPost(postId: string): Promise<PostInterface> {
    const metaData = await this.getMetaData(postId);
    const markdown = await this.getPostMarkdown(postId);

    return this.decode(metaData, markdown);
  }

  private decodeMetaData(result: any): PostMetaData {
    /** dirty */
    const title = getTitle(result);
    const description = getDescription(result);

    return {
      object: 'page',
      cover: null,
      createdBy: result.created_by,
      createdTime: result.created_time,
      archived: result.archived,
      icon: null,
      id: result.id,
      title: title ? title : '',
      description: description ? description : '',
      lastEditedTime: result.last_edited_time,
    };
  }

  private decode(notionMetaData: any, content: string): PostInterface {
    return {
      ...this.decodeMetaData(notionMetaData),
      content,
    };
  }
}

const postService = new Post(notion, n2m);

export default postService;

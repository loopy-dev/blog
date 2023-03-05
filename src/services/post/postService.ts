import fs from 'fs';
import remarkFrontMatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkParseFrontMatter from 'remark-parse-frontmatter';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import type { FrontMatter } from '~models/Post';

/**
 *
 * @param fullFileName fileName endsWith extension
 * @example
 * fullFileName: `example.md`
 * @returns fileName without extension `example.md` -> `example`
 */
export const parseFileName = (fullFileName: string, extension: string) => {
  return fullFileName.slice(0, -(extension.length + 1));
};

export class PostService {
  // need relative path
  currentPath: string;

  constructor(directory: string) {
    this.currentPath = directory;
  }

  private getFile(fileName: string) {
    return fs.readFileSync(this.currentPath + fileName, {
      encoding: 'utf-8',
    });
  }

  /** fileName ends with `.md` */
  async decodeMetaData(fileName: string): Promise<FrontMatter> {
    const file = this.getFile(fileName);

    const result = await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontMatter, ['yaml'])
      .use(remarkParseFrontMatter)
      .process(file);

    return {
      ...(result.data.frontmatter as FrontMatter),
      title: parseFileName(fileName, 'md'),
    };
  }

  getPostList() {
    return fs
      .readdirSync(this.currentPath)
      .filter((file) => file.endsWith('.md'));
  }

  async getPostListMetaData() {
    const fileList = this.getPostList();

    const frontMatters = await Promise.all(
      fileList.map(async (file) => await this.decodeMetaData(file))
    );

    return frontMatters.sort(
      (a, b) =>
        new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
    );
  }

  decode(fileName: string) {
    const file = this.getFile(fileName);

    return file;
  }
}

const dir = 'content/posts/';
const postService = new PostService(dir);

export default postService;

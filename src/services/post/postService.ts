import fs from 'fs';
import path from 'path';
import remarkFrontMatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkParseFrontMatter from 'remark-parse-frontmatter';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import type { FrontMatter } from '~models/Post';

class PostService {
  // need relative path
  currentPath: string;

  constructor(directory: string) {
    this.currentPath = directory;
  }

  getFile(fileName: string) {
    return fs.readFileSync(path.resolve(this.currentPath, fileName), {
      encoding: 'utf-8',
    });
  }

  async decodeMetaData(fileName: string): Promise<FrontMatter> {
    const file = this.getFile(fileName);

    const result = await unified()
      .use(remarkParse)
      .use(remarkStringify)
      .use(remarkFrontMatter, ['yaml'])
      .use(remarkParseFrontMatter)
      .process(file);

    return result.data.frontmatter as FrontMatter;
  }

  // TODO - add filters
  async getPostList() {
    const fileList = fs.readdirSync(path.resolve(this.currentPath));

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

export default PostService;

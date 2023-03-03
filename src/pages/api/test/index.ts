import fs from 'fs';
import path from 'path';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkParseFrontmatter from 'remark-parse-frontmatter';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import type { NextApiRequest, NextApiResponse } from 'next';

const test = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // get File List
    const fileList = fs.readdirSync(
      path.resolve(__dirname, '../../../../content/posts')
    );

    // read all files
    const files = fileList.map((file) =>
      fs.readFileSync(
        path.resolve(__dirname, '../../../../content/posts', file),
        { encoding: 'utf-8' }
      )
    );

    // get frontmatter files
    const results = await Promise.all(
      files.map(async (file) => {
        const result = await unified()
          .use(remarkParse)
          .use(remarkStringify)
          .use(remarkFrontmatter, ['yaml'])
          .use(remarkParseFrontmatter)
          .process(file);

        return result.data.frontmatter;
      })
    );

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: 'not found.',
    });
  }
};

export default test;

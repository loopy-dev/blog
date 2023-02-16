import { NotionToMarkdown } from 'notion-to-md';
import notion from './index';

const m2w = new NotionToMarkdown({ notionClient: notion });

export default m2w;

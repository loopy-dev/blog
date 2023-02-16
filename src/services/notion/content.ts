import { NotionToMarkdown } from 'notion-to-md';
import notion from './index';

const n2m = new NotionToMarkdown({ notionClient: notion });

export default n2m;

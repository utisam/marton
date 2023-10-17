import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { Compatible } from 'vfile';
import { rootToBlocks, rootToRichText } from './convert/root';
import { BlockObjectRequest, RichTextItemRequest } from './notionTypes';

export { rootToBlocks, rootToRichText };

export function markdownToBlocks(file: Compatible): BlockObjectRequest[] {
    const root = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(file);
    return Array.from(rootToBlocks(root));
}

export function markdownToRichText(file: Compatible): RichTextItemRequest[] {
    const root = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(file);
    return Array.from(rootToRichText(root));
}

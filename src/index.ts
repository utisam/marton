import remarkGfm from 'remark-gfm';
import remarkGithub from 'remark-github';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { Compatible } from 'vfile';
import { rootToBlocks } from './convert/root';

export function markdownToBlocks(file: Compatible) {
    const root = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkGithub)
        .parse(file);
    return Array.from(rootToBlocks(root));
}

import { Blockquote } from 'mdast';
import Option, { nodeToMarkdown } from '../option';
import { QuoteObjectRequest } from '../notionTypes';

export function blockquoteToBlocks(child: Blockquote, option?: Option): Iterable<QuoteObjectRequest> {
    return [
        {
            type: 'quote',
            quote: {
                rich_text: [
                    {
                        type: 'text',
                        text: {
                            content: nodeToMarkdown({ type: 'root', children: child.children }, option),
                        },
                    },
                ],
            },
        },
    ];
}

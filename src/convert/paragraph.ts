import { Paragraph } from 'mdast';
import { ParagraphObjectRequest } from '../notionTypes';
import { phrasingContentToRichText } from './phrasing';

export function paragraphToBlocks(child: Paragraph): Iterable<ParagraphObjectRequest> {
    return [
        {
            object: 'block',
            type: 'paragraph',
            paragraph: {
                rich_text: child.children.map(phrasingContentToRichText),
            },
        },
    ];
}

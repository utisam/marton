import { Paragraph } from 'mdast';
import { ParagraphObjectRequest } from '../notionTypes';
import { phrasingContentToRichText } from './phrasing';
import Option from '../option';

export function paragraphToBlocks(child: Paragraph, option?: Option): Iterable<ParagraphObjectRequest> {
    return [
        {
            object: 'block',
            type: 'paragraph',
            paragraph: {
                rich_text: child.children.flatMap((child) => phrasingContentToRichText(child, option)),
            },
        },
    ];
}

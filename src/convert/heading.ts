import { Heading } from 'mdast';
import { HeadingObjectRequest, RichTextItemRequest } from '../notionTypes';
import { phrasingContentToRichText } from './phrasing';
import Option from '../option';

export function headingToBlocks(child: Heading, option?: Option): Iterable<HeadingObjectRequest> {
    if (child.depth === 1) {
        return [{
            object: 'block',
            type: 'heading_1',
            heading_1: {
                rich_text: phrasingContentsToRichText(child, option),
            },
        }];
    } else if (child.depth === 2) {
        return [{
            object: 'block',
            type: 'heading_2',
            heading_2: {
                rich_text: phrasingContentsToRichText(child, option),
            },
        }];
    } else {
        return [{
            object: 'block',
            type: 'heading_3',
            heading_3: {
                rich_text: phrasingContentsToRichText(child, option),
            },
        }];
    }
}

function phrasingContentsToRichText(child: Heading, option?: Option): RichTextItemRequest[] {
    return child.children.flatMap((child) => phrasingContentToRichText(child, option));
}

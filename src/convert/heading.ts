import { Heading } from 'mdast';
import { HeadingObjectRequest, RichTextItemRequest } from '../notionTypes';
import { phrasingContentToRichText } from './phrasing';

export function headingToBlocks(child: Heading): Iterable<HeadingObjectRequest> {
    if (child.depth === 1) {
        return [{
            object: 'block',
            type: 'heading_1',
            heading_1: {
                rich_text: phrasingContentsToRichText(child),
            },
        }];
    } else if (child.depth === 2) {
        return [{
            object: 'block',
            type: 'heading_2',
            heading_2: {
                rich_text: phrasingContentsToRichText(child),
            },
        }];
    } else {
        return [{
            object: 'block',
            type: 'heading_3',
            heading_3: {
                rich_text: phrasingContentsToRichText(child),
            },
        }];
    }
}

function phrasingContentsToRichText(child: Heading): RichTextItemRequest[] {
    return child.children.map(phrasingContentToRichText);
}

import { Root, RootContent, Paragraph } from 'mdast';
import { BlockObjectRequest, RichTextItemRequest } from '../notionTypes';
import { headingToBlocks } from './heading';
import { paragraphToBlocks } from './paragraph';
import { phrasingContentToRichText } from './phrasing';
import Option, { unsupportedNode } from '../option';
import { blockquoteToBlocks } from './blockquote';

export function* rootToBlocks(root: Root, option?: Option): Iterable<BlockObjectRequest> {
    for (const child of root.children) {
        yield* rootContentToBlocks(child, option);
    }
}

function rootContentToBlocks(child: RootContent, option?: Option): Iterable<BlockObjectRequest> {
    switch (child.type) {
        case 'blockquote':
            return blockquoteToBlocks(child, option);
        case 'heading':
            return headingToBlocks(child, option);
        case 'paragraph':
            return paragraphToBlocks(child, option);
        default:
            unsupportedNode(child, option);
            return [];
    }
}

export function rootToRichText(root: Root, option?: Option): Iterable<RichTextItemRequest> {
    const first = root.children[0];
    if (first?.type === 'paragraph') {
        return (first as Paragraph).children.flatMap(child => phrasingContentToRichText(child, option));
    }
    throw new Error(`Root content must be a paragraph: ${first?.type}`);
}
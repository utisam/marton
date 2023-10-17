import { Root, RootContent, Paragraph } from 'mdast';
import { BlockObjectRequest, RichTextItemRequest } from '../notionTypes';
import { headingToBlocks } from './heading';
import { paragraphToBlocks } from './paragraph';
import { phrasingContentToRichText } from './phrasing';

export function* rootToBlocks(root: Root): Iterable<BlockObjectRequest> {
    for (const child of root.children) {
        yield* rootContentToBlocks(child);
    }
}

function rootContentToBlocks(child: RootContent): Iterable<BlockObjectRequest> {
    if (child.type === 'heading') {
        return headingToBlocks(child);
    } else if (child.type === 'paragraph') {
        return paragraphToBlocks(child);
    }
    throw new Error(`Function not implemented: ${child.type}`);
}

export function rootToRichText(root: Root): Iterable<RichTextItemRequest> {
    const first = root.children[0];
    if (first?.type === 'paragraph') {
        return (first as Paragraph).children.flatMap(phrasingContentToRichText);
    }
    throw new Error(`Root content must be a paragraph: ${first?.type}`);
}
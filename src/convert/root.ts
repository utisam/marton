import { Root, RootContent } from 'mdast';
import { BlockObjectRequest } from '../notionTypes';
import { headingToBlocks } from './heading';
import { paragraphToBlocks } from './paragraph';

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


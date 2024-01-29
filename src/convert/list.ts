import { List, ListItem } from 'mdast';
import { BlockObjectRequestWithoutChildren, BulletedListItemObjectRequest, NumberedListItemObjectRequest } from '../notionTypes';
import Option from '../option';
import { phrasingContentToRichText } from './phrasing';

export function listToBlocks(child: List, option?: Option): Iterable<BlockObjectRequestWithoutChildren> {
    if (child.ordered) {
        return child.children.map((child) => listItemToNumberedListItem(child, option));
    } else {
        return child.children.map((child) => listItemToBulletedListItem(child, option));
    }
}

function listItemToNumberedListItem(child: ListItem, option?: Option): NumberedListItemObjectRequest {
    const numberedListItem: NumberedListItemObjectRequest['numbered_list_item'] = {
        rich_text: listItemText(child, option),
    };
    const nested = child.children[1];
    if (nested?.type === 'list') {
        numberedListItem['children'] = [...listToBlocks(nested, option)];
    }
    return {
        type: 'numbered_list_item',
        numbered_list_item: numberedListItem,
    };
}

function listItemToBulletedListItem(child: ListItem, option?: Option): BulletedListItemObjectRequest {
    const bulletedListItem: BulletedListItemObjectRequest['bulleted_list_item'] = {
        rich_text: listItemText(child, option),
    };
    const nested = child.children[1];
    if (nested?.type === 'list') {
        bulletedListItem['children'] = [...listToBlocks(nested, option)];
    }
    return {
        type: 'bulleted_list_item',
        bulleted_list_item: bulletedListItem,
    };
}

function listItemText(child: ListItem, option: Option | undefined) {
    const paragraph = child.children[0];
    return (paragraph.type === 'paragraph')
        ? paragraph.children.flatMap((child) => phrasingContentToRichText(child, option))
        : [];
}


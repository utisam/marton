import { ThematicBreak } from "mdast";
import Option from "../option";
import { DividerObjectRequest } from "../notionTypes";

export function thematicBreakToBlocks(child: ThematicBreak, option?: Option): Iterable<DividerObjectRequest> {
    return [{
        type: 'divider',
        divider: {},
    }];
}
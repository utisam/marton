import type { ThematicBreak } from "mdast";
import type { DividerObjectRequest } from "../notionTypes";
import type Option from "../option";

export function thematicBreakToBlocks(
  child: ThematicBreak,
  option?: Option,
): Iterable<DividerObjectRequest> {
  return [
    {
      type: "divider",
      divider: {},
    },
  ];
}

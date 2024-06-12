import { markdownToBlocks } from "@utisam/marton";

const blocks = markdownToBlocks(
  `
# Test

* aaa
  * bbb
`.trim(),
);
console.log(JSON.stringify(blocks, null, "  "));

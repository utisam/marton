# Marton

Convert markdown to notion blocks.

```js
import { markdownToBlocks } from 'marton';

const blocks = markdownToBlocks(`
# Test

* aaa
  * bbb
`.trim());
console.log(JSON.stringify(blocks, null, "  "));
```

# Marton

[![CI](https://github.com/utisam/marton/actions/workflows/ci.yml/badge.svg)](https://github.com/utisam/marton/actions/workflows/ci.yml)
[![NPM Version](https://img.shields.io/npm/v/@utisam/marton)](https://www.npmjs.com/package/@utisam/marton)
[![GitHub License](https://img.shields.io/github/license/utisam/marton)](https://github.com/utisam/marton/blob/main/LICENSE)

Convert markdown to notion v2 blocks.

```js
import { markdownToBlocks } from '@utisam/marton';

const blocks = markdownToBlocks(`
# Test

* aaa
  * bbb
`.trim());
console.log(JSON.stringify(blocks, null, "  "));
```

## API

### `markdownToBlocks(file[, option])`

#### Parameters

* `file` ([vfile.Compatible])
  — virtual file representing the input document
* `option` ([Option](#option))
  — virtual file representing the input document

#### Returns

Array of [Notion Block] object.

### `markdownToRichText(file[, option])`

#### Parameters

* `file` ([vfile.Compatible])
  — virtual file representing the input document
* `option` ([Option](#option)) — virtual file representing the input document

#### Returns

Array of [Notion Rich Text] object.

### `Option`

#### Fields

* `logWarn?` (`(string) => void`)
  — Callback to print warning logs.
* `toMarkdown?` (`(Nodes) => string`)
  — Callback to convert markdown to plain text.
* `unsupportedError?` (`boolean`)
  — Error will be thrown when an unimplemented Markdown syntax was found.

### `rootToBlocks(root[, option])`

#### Parameters

* `root` ([mdast.Root])
  — virtual file representing the input document
* `option` ([Option](#option))
  — virtual file representing the input document

#### Returns

Iterable of [Notion Block] object.

### `rootToRichText(root[, option])`

#### Parameters

* `root` ([mdast.Root])
  — virtual file representing the input document
* `option` ([Option](#option))
  — virtual file representing the input document

#### Returns

Iterable of [Notion Rich Text] object.

[Notion Block]: https://developers.notion.com/reference/block
[Notion Rich Text]: https://developers.notion.com/reference/rich-text
[mdast.Root]: https://www.npmjs.com/package/mdast#root
[vfile.Compatible]: https://www.npmjs.com/package/vfile#compatible

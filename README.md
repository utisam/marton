# Marton

[![CI](https://github.com/utisam/marton/actions/workflows/ci.yml/badge.svg)](https://github.com/utisam/marton/actions/workflows/ci.yml)
![NPM Version](https://img.shields.io/npm/v/@utisam/marton)
![GitHub License](https://img.shields.io/github/license/utisam/marton)

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

Array of [Notion Block](https://developers.notion.com/reference/block) object.

### `markdownToRichText(file[, option])`

#### Parameters

* `file` ([vfile.Compatible])
  — virtual file representing the input document
* `option` ([Option](#option)) — virtual file representing the input document

#### Returns

Array of [Notion Rich Text](https://developers.notion.com/reference/rich-text) object.

### `Option`

#### Fields

* `logWarn?` (`(string) => void`)
  — Callback to print warning logs.
* `toMarkdown?` (`(Nodes) => string`)
  — Callback to convert markdown to plain text.
* `unsupportedError?` (`boolean`)
  — Error will be thrown when an unimplemented Markdown syntax was found.

[vfile.Compatible]: https://www.npmjs.com/package/vfile#compatible

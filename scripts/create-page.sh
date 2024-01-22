#!/bin/sh

jq '{ parent: { page_id: "'"$PARENT_PAGE_ID"'" }, properties: { title: { type: "title", title: [ { type: "text", text: { "content": "Title" } } ] } }, children: . }' \
  | curl 'https://api.notion.com/v1/pages' \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2022-06-28" \
    --data @-

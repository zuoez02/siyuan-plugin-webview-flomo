# Web Tool Integration

## Features

1. Built-in default apps, can add web pages for online use, see the example below
2. Add apps to the dock for easier access

## Built-in Apps

### Flomo

Integrated with the online version of Flomo, click on the Flomo icon on the top toolbar to open it. Flomo supports dragging cards directly into the editor, which will automatically convert the content into blocks and support images, links, and other content.

### Cubox

Integrated with the online version of Cubox, click on the Cubox icon on the top toolbar to open it.

### TickTick

Integrated with the online version of TickTick, click on the TickTick icon on the top toolbar to open it.

### Customization

1. Click on the add button in the top right corner, do not include spaces or special characters in the name.
2. Support custom scripts and debug mode. After adding, manually modify the JSON in `workspace_directory/data/storage/petal/siyuan-plugin-webapp/app.txt` to add the script field and debug field.

## Example

```json
{
    "name": "AI",
    "iconName": "iconAI",
    "iconSvg": "<img href="\&#34;data:image/svg+xml;base64,PHN2ZyBpZD0ib3BlbmFpLXN5bWJvbCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGQ9Ik0yOS43MSwxMy4wOUE4LjA5LDguMDksMCwwLDAsMjAuMzQsMi42OGE4LjA4LDguMDgsMCwwLDAtMTMuNywyLjlBOC4wOCw4LjA4LDAsMCwwLDIuMywxOC45LDgsOCwwLDAsMCwzLDI1LjQ1YTguMDgsOC4wOCwwLDAsMCw4LjY5LDMuODcsOCw4LDAsMCwwLDYsMi42OCw4LjA5LDguMDksMCwwLDAsNy43LTUuNjEsOCw4LDAsMCwwLDUuMzMtMy44NkE4LjA5LDguMDksMCwwLDAsMjkuNzEsMTMuMDlabS0xMiwxNi44MmE2LDYsMCwwLDEtMy44NC0xLjM5bC4xOS0uMTEsNi4zNy0zLjY4YTEsMSwwLDAsMCwuNTMtLjkxdi05bDIuNjksMS41NmEuMDguMDgsMCwwLDEsLjA1LjA3djcuNDRBNiw2LDAsMCwxLDE3LjY4LDI5LjkxWk00LjgsMjQuNDFhNiw2LDAsMCwxLS43MS00bC4xOS4xMSw2LjM3LDMuNjhhMSwxLDAsMCwwLDEsMGw3Ljc5LTQuNDlWMjIuOGEuMDkuMDksMCwwLDEsMCwuMDhMMTMsMjYuNkE2LDYsMCwwLDEsNC44LDI0LjQxWk0zLjEyLDEwLjUzQTYsNiwwLDAsMSw2LjI4LDcuOXY3LjU3YTEsMSwwLDAsMCwuNTEuOWw3Ljc1LDQuNDdMMTEuODUsMjIuNGEuMTQuMTQsMCwwLDEtLjA5LDBMNS4zMiwxOC42OGE2LDYsMCwwLDEtMi4yLTguMThabTIyLjEzLDUuMTQtNy43OC00LjUyTDIwLjE2LDkuNmEuMDguMDgsMCwwLDEsLjA5LDBsNi40NCwzLjcyYTYsNiwwLDAsMS0uOSwxMC44MVYxNi41NkExLjA2LDEuMDYsMCwwLDAsMjUuMjUsMTUuNjdabTIuNjgtNC0uMTktLjEyLTYuMzYtMy43YTEsMSwwLDAsMC0xLjA1LDBsLTcuNzgsNC40OVY5LjJhLjA5LjA5LDAsMCwxLDAtLjA5TDE5LDUuNGE2LDYsMCwwLDEsOC45MSw2LjIxWk0xMS4wOCwxNy4xNSw4LjM4LDE1LjZhLjE0LjE0LDAsMCwxLS4wNS0uMDhWOC4xYTYsNiwwLDAsMSw5Ljg0LTQuNjFMMTgsMy42LDExLjYxLDcuMjhhMSwxLDAsMCwwLS41My45MVpNMTIuNTQsMTQsMTYsMTJsMy40NywydjRMMTYsMjBsLTMuNDctMloiLz48L3N2Zz4=\&#34;"/>",
    "iconSymbolSize": 150,
    "title": "AI",
    "isTopBar": true,
    "topBarPostion": "right",
    "url": "https://url.ai-node.com/",
    "script": "alert(123)",
    "debug": true
  }
```


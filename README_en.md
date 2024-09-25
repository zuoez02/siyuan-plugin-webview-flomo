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

## Changelog

### v3.6.0
+ Added an optional configuration for webapp to allow opening external links by default, and intercepting link opening when disabled.
+ Added a method for webapp to automatically obtain icons from links, with a certain probability of success.

### v3.5.4
+ Added a referer configuration for webapp, allowing modification of request referer.

### v3.5.3
+ Resolved the issue of installation failure on the first attempt.

### v3.5.1
+ Adapted to v2.12.4.

### v3.5.0
+ Window supports control operations, located at the bottom left corner of each webapp page, functions include: returning to the home page (the default URL of the webapp), refreshing the current page, zooming in, zooming out, resetting, going back, going forward, and opening developer tools.

### v3.4.5
+ Used synchronous loading configuration to solve the issue of the dock not appearing.

### v3.4.4
+ Fixed the drag mask.

### v3.4.1
+ Temporarily removed the drag mask.

### v3.4.0
+ Added the feature to copy to blocks, usage method: click the copy button on the far right of the APP, and paste it in the document. The current height limit is 500. If you need to change the height, please manually click the pencil button at the top right corner of the custom block, modify the number 500 inside, save and reopen the tab for it to take effect.

### v3.2.1
+ Click anywhere to close the right-click menu.

### v3.2.0
+ Introduced Webview menu technology, supporting right-click menus in webapps.

### v3.1.0
+ Support for configuring independent proxies for each APP (uses the default proxy configuration of SiYuan when not configured).

### v3.0.0
+ Engineering reconstruction.

### v2.7.0
+ Support for configuring CSS styles (see the demo above).
+ When configuring CSS styles, it will automatically inject global CSS variables siyuan-mode (light, dark) and siyuan-theme (current theme name), and add a siyuan-mode attribute to the \<html\> tag, facilitating CSS filtering for theme adaptation.

### v2.6.0
+ Cubox distinguishes between the international version and the Chinese version.
+ Supports hiding web apps, with a button added at the top of the dock to control the display of all hidden apps.

### v2.5.2
+ Modified the openTab parameter to fix issues encountered in v2.10.9.

### v2.5.1
+ Fixed the issue where tasks in the Tick List could not be dragged.

### v2.5.0
+ Supports automatic generation of lists by dragging tasks in the Tick List.

### v2.4.1
+ Removed the requirement for a mandatory logo, defaulting to icon HTML5.

### v2.4.0
+ Added a feature to set the home page, using the blank page after closing all tabs as the home page.
+ UI optimization.

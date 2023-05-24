# Web工具集成

## Flomo
集成Flomo的在线网页版，点击顶栏右侧的flomo icon即可打开

## Cubox
集成Cubox的在线网页版，点击顶栏右侧的Cubox icon即可打开

## 滴答清单
集成滴答清单的在线网页版，点击顶栏右侧的滴答清单 icon即可打开

## 自定义

1. 点击右上角添加，输入名称请勿带有空格和特殊符号。
2. 支持自定义脚本和debug模式，需添加完成后手动在`工作空间目录/data/storage/petal/siyuan-plugin-webapp/app.txt`中修改json，添加script字段和debug字段

### Example
```json
{
    "name": "AI",
    "iconName": "iconAI",
    "iconSvg": "<image href=\"data:image/svg+xml;base64,PHN2ZyBpZD0ib3BlbmFpLXN5bWJvbCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzIgMzIiPjxwYXRoIGQ9Ik0yOS43MSwxMy4wOUE4LjA5LDguMDksMCwwLDAsMjAuMzQsMi42OGE4LjA4LDguMDgsMCwwLDAtMTMuNywyLjlBOC4wOCw4LjA4LDAsMCwwLDIuMywxOC45LDgsOCwwLDAsMCwzLDI1LjQ1YTguMDgsOC4wOCwwLDAsMCw4LjY5LDMuODcsOCw4LDAsMCwwLDYsMi42OCw4LjA5LDguMDksMCwwLDAsNy43LTUuNjEsOCw4LDAsMCwwLDUuMzMtMy44NkE4LjA5LDguMDksMCwwLDAsMjkuNzEsMTMuMDlabS0xMiwxNi44MmE2LDYsMCwwLDEtMy44NC0xLjM5bC4xOS0uMTEsNi4zNy0zLjY4YTEsMSwwLDAsMCwuNTMtLjkxdi05bDIuNjksMS41NmEuMDguMDgsMCwwLDEsLjA1LjA3djcuNDRBNiw2LDAsMCwxLDE3LjY4LDI5LjkxWk00LjgsMjQuNDFhNiw2LDAsMCwxLS43MS00bC4xOS4xMSw2LjM3LDMuNjhhMSwxLDAsMCwwLDEsMGw3Ljc5LTQuNDlWMjIuOGEuMDkuMDksMCwwLDEsMCwuMDhMMTMsMjYuNkE2LDYsMCwwLDEsNC44LDI0LjQxWk0zLjEyLDEwLjUzQTYsNiwwLDAsMSw2LjI4LDcuOXY3LjU3YTEsMSwwLDAsMCwuNTEuOWw3Ljc1LDQuNDdMMTEuODUsMjIuNGEuMTQuMTQsMCwwLDEtLjA5LDBMNS4zMiwxOC42OGE2LDYsMCwwLDEtMi4yLTguMThabTIyLjEzLDUuMTQtNy43OC00LjUyTDIwLjE2LDkuNmEuMDguMDgsMCwwLDEsLjA5LDBsNi40NCwzLjcyYTYsNiwwLDAsMS0uOSwxMC44MVYxNi41NkExLjA2LDEuMDYsMCwwLDAsMjUuMjUsMTUuNjdabTIuNjgtNC0uMTktLjEyLTYuMzYtMy43YTEsMSwwLDAsMC0xLjA1LDBsLTcuNzgsNC40OVY5LjJhLjA5LjA5LDAsMCwxLDAtLjA5TDE5LDUuNGE2LDYsMCwwLDEsOC45MSw2LjIxWk0xMS4wOCwxNy4xNSw4LjM4LDE1LjZhLjE0LjE0LDAsMCwxLS4wNS0uMDhWOC4xYTYsNiwwLDAsMSw5Ljg0LTQuNjFMMTgsMy42LDExLjYxLDcuMjhhMSwxLDAsMCwwLS41My45MVpNMTIuNTQsMTQsMTYsMTJsMy40NywydjRMMTYsMjBsLTMuNDctMloiLz48L3N2Zz4=\" />",
    "iconSymbolSize": 150,
    "title": "AI",
    "isTopBar": true,
    "topBarPostion": "right",
    "url": "https://url.ai-node.com/",
    "script": "alert(123)",
    "debug": true
  }
```

适配思源v2.8.9
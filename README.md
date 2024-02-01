# Web工具集成

## 功能

1. 内置默认app，可自行添加web页面使用在线内容，见下面example
2. 将app添加到dock，更易用
3. 将app作为默认空白页
4. 将app复制为块，添加到文档
5. 支持控制App页面

## 内置APP

### Flomo
集成Flomo的在线网页版，点击顶栏右侧的flomo icon即可打开。Flomo支持将卡片直接拖拽到编辑器中，会自动将内容转换为内容块，支持图片、链接等内容。

### Cubox
集成Cubox的在线网页版，点击顶栏右侧的Cubox icon即可打开

### 滴答清单
集成滴答清单的在线网页版，点击顶栏右侧的滴答清单 icon即可打开。滴答清单支持将任务拖拽到编辑器中，会自动转换为清单（包含任务状态）。

### 自定义

1. 点击右上角添加，输入名称请勿带有空格和特殊符号。
2. 支持自定义脚本、CSS和debug模式，需添加完成后手动在`工作空间目录/data/storage/petal/siyuan-plugin-webapp/app.txt`中修改json，添加script字段、CSS字段和debug字段

## Example
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
    "css": "html[siyuan-theme=\"light\"] body { background-color: var(--siyuan-theme); }",
    "debug": true
  }
```
---

## Changelog
### v3.5.4
+ 增加webapp的referer配置，允许修改请求referer

### v3.5.3
+ 解决首次安装的失败问题

### v3.5.1
+ 适配v2.12.4

### v3.5.0
+ 窗口支持控制操作，位于每个webapp页面的左下角，功能包括：回到首页(WebAPP的默认URL)、刷新当前页面、放大、缩小、恢复、后退、前进、打开开发者工具

### v3.4.5
+ 使用同步加载配置解决dock出不来的的问题

### v3.4.4
+ 修复拖拽遮罩

### v3.4.1
+ 暂时移除拖拽遮罩

### v3.4.0
+ 增加复制到块的功能，使用方法：点击APP最右侧的复制按钮，在文档中粘贴即可。目前高度限制为500，如果需要修改高度，请手动点击自定义块右上角的铅笔按钮，修改内部的数字500，保存并重新打开页签生效。

### v3.2.1
+ 点击任意位置关闭右键菜单

### v3.2.0
+ 引入Webview菜单技术，支持在webapp中右键菜单

### v3.1.0
+ 支持为每个APP配置独立的代理了(未配置时采用思源的默认代理配置)

### v3.0.0
+ 工程化重构

### v2.7.0
+ 支持配置CSS样式了(详见上方demo)
+ 当配置CSS样式时, 会自动注入css全局变量siyuan-mode(light, dark)和siyuan-theme(当前主题名称), 并在\<html\>上增加siyuan-mode属性，便于CSS过滤使用以适配主题。

### v2.6.0
+ Cubox区分国际版和中国版
+ 支持隐藏Web应用，dock顶端增加按钮控制显示所有隐藏应用

### v2.5.2
+ 修改openTab参数，修复v2.10.9中遇到的问题

### v2.5.1
+ 修复滴答清单单挑任务无法拖动的问题

### v2.5.0
+ 支持滴答清单的任务拖拽自动生成清单。

### v2.4.1
+ 移除必选logo的要求，默认iconHTML5

### v2.4.0
+ 增加设置主页功能，将关闭所有tab后空白的页面作为首页
+ UI优化

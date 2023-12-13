import { WebApp } from "@/WebApp";
import { CustomBlock, CustomBlockManager } from "siyuan-package-custom-block";
import WebAppPlugin from "..";
import { renderView } from "./render";

export class WebAppViewBlock extends CustomBlock {
    static type = 'WebAppViewBlock';

    static css = `
    .webapp-view {
        height: 500px;
        width: 100%;
    }
    .fn__none {
        display: none;
    }
    webview {
        width: 100%;
        height: 100%;
    }
    `

    onMount(el: HTMLElement, data: any): void {
        const context = { element: el, data: data.app };
        renderView(context, null);
    }
}


export function createWebappViewBlock(app: WebApp) {
    const content = CustomBlockManager.buildBlock(WebAppViewBlock.type, {
       app,
    });
    navigator.clipboard.writeText(content);
}
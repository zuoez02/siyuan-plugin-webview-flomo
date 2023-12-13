import { WebApp } from "@/WebApp";
import { CustomBlock, CustomBlockManager } from "siyuan-package-custom-block";
import WebAppPlugin from "..";
import { renderView } from "./render";

export class WebAppViewBlock extends CustomBlock {
    static type = 'WebAppViewBlock';

    static css = `
    .webapp-view {
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

    onMount(el: HTMLElement, data: { height: number, app: WebApp }, plugin: WebAppPlugin): void {
        const context = { element: el, data: data.app };
        renderView(context, plugin);
        el.querySelector('.webapp-view').setAttribute('style', `height: ${data.height}px`);
    }
}


export function createWebappViewBlock(app: WebApp) {
    const content = CustomBlockManager.buildBlock(WebAppViewBlock.type, {
        height: 500,
        app: {
            name: app.name,
            url: app.url,
            proxy: app.proxy,
            script: app.script,
            css: app.css,
            debug: app.debug,
        },
    });
    navigator.clipboard.writeText(content);
}
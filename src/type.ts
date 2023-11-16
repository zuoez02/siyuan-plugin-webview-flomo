export interface WebviewElement extends HTMLElement {
    executeJavaScript(script: string): Promise<void>;
    insertCSS(css: string): Promise<void>;
    openDevTools(): Promise<void>;
}
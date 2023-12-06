import { WebApp } from "@/WebApp";
import { Setting } from "siyuan";


export class SettingDialog {
    setting: Setting;
    app: WebApp;

    constructor(app: WebApp, callback?: (title: string, css: string) => void) {
        this.app = app;
        this.setting = new Setting({
            height: '500px',
            width: '500px',
            confirmCallback: async () => {
                const title = eleTitle.value;
                const css = eleCss.value;
                // const script = eleJs.value;
                if (callback) {
                    callback(title, css);
                }
            }
        });
        //@ts-ignore
        const eleTitle: HTMLInputElement = this.addItem('标题', 'Web App 的展示标题', 'textinput', this.app.title);
        //@ts-ignore
        const eleCss: HTMLInputElement = this.addItem('CSS代码', '插入的自定义 CSS 样式', 'textarea', this.app.css);
        //@ts-ignore
        // const eleJs: HTMLTextAreaElement = this.addItem('Js代码', '插入的自定义 Js 代码', 'textarea', this.app.script);
    }

    show() {
        this.setting.open(`Webapp ${this.app.name} 设置`)
    }

    /**
     * Copyright (c) 2023 frostime
     * @src https://github.com/frostime/plugin-sample-vite/blob/main/src/libs/setting-utils.ts
     */
    addItem(title: string, description: string, type: string, value, options?: { [key: string]: string }) {
        // this.settings.set(item.key, item);
        let itemElement: HTMLElement;
        switch (type) {
            case 'checkbox':
                let element: HTMLInputElement = document.createElement('input');
                element.type = 'checkbox';
                element.checked = value;
                element.className = "b3-switch fn__flex-center";
                itemElement = element;
                break;
            case 'select':
                let selectElement: HTMLSelectElement = document.createElement('select');
                selectElement.className = "b3-select fn__flex-center fn__size200";
                options = options ?? {};
                for (let val in options) {
                    let optionElement = document.createElement('option');
                    let text = options[val];
                    optionElement.value = val;
                    optionElement.text = text;
                    selectElement.appendChild(optionElement);
                }
                selectElement.value = value;
                itemElement = selectElement;
                break;
            case 'textinput':
                let textInputElement: HTMLInputElement = document.createElement('input');
                textInputElement.className = 'b3-text-field fn__flex-center fn__size200';
                textInputElement.value = value;
                itemElement = textInputElement;
                break;
            case 'textarea':
                let textareaElement: HTMLTextAreaElement = document.createElement('textarea');
                textareaElement.className = "b3-text-field fn__block";
                textareaElement.value = value;
                textareaElement.style.height = '10em';
                itemElement = textareaElement;
                break;
        }

        this.setting.addItem({
            title: title,
            description: description,
            actionElement: itemElement
        });
        return itemElement;
    }

}

import { WebApp } from "@/WebApp";
import { Setting } from "siyuan";


export class SettingDialog {
    setting: Setting;
    app: WebApp;
    i18n;

    constructor(app: WebApp, i18n, callback?: (app: any) => void) {
        this.app = app;
        this.i18n = i18n;
        this.setting = new Setting({
            height: '700px',
            width: '700px',
            confirmCallback: async () => {
                const title = eleTitle.value;
                const css = eleCss.value;
                const script = eleJs.value;
                const proxy = proxyElement.value;
                const autoIcon = autoIconEl.checked;
                const allowPopups = allowPopupsEl.checked;
                if (callback) {
                    callback({ title, css, script, proxy, autoIcon, allowPopups});
                }
            }
        });
        //@ts-ignore
        const eleTitle: HTMLInputElement = this.addItem(i18n.setting.name, i18n.setting.nameDesc, 'textinput', this.app.title);
        //@ts-ignore
        const proxyElement: HTMLInputElement = this.addItem(i18n.setting.proxy, i18n.setting.proxyDesc, 'textinput', this.app.proxy);
        //@ts-ignore
        const eleCss: HTMLInputElement = this.addItem(i18n.setting.css, i18n.setting.cssDesc, 'textarea', this.app.css);
        //@ts-ignore
        const eleJs: HTMLTextAreaElement = this.addItem(i18n.setting.js, i18n.setting.jsDesc, 'textarea', this.app.script);
        //@ts-ignore
        const autoIconEl: HTMLInputElement = this.addItem(i18n.setting.autoIcon, i18n.setting.autoIconDesc, 'checkbox', this.app.autoIcon);
        //@ts-ignore
        const allowPopupsEl: HTMLInputElement = this.addItem(i18n.allowPopups, i18n.allowPopups, 'checkbox', this.app.allowPopups);
        
    }

    show() {
        this.setting.open(this.i18n.setting.title.replace("${name}", this.app.name))
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

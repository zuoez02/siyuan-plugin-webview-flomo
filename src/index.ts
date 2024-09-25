import siyuan, { Plugin, confirm, openTab, showMessage } from "siyuan";
import { WebAppDock } from "./WebAppDock";
import { flomo } from "./apps/flomo";
import { cubox, cuboxPro } from "./apps/cubox";
import { dida } from "./apps/dida";
import { i18n } from "./utils";
import { WebApp } from "./WebApp";
import { renderView } from "./utils/render";
import * as sdk from "@siyuan-community/siyuan-sdk";
import "./index.scss";
import { CustomBlockManager } from "siyuan-package-custom-block";
import { WebAppViewBlock } from "./utils/viewblock";
import $ from 'jquery';

export default class WebAppPlugin extends Plugin {
  siyuan = siyuan;
  webAppDock: WebAppDock;

  client = new sdk.Client(undefined, 'fetch');

  apps = [flomo, cubox, cuboxPro, dida];

  settingConfig = {
    homepage: "",
    hidden: [],
    showHidden: false,
  };

  appsConfig = [];

  docksConfig = [];

  onload() {
    CustomBlockManager.init(this);
    CustomBlockManager.load(WebAppViewBlock);

    Object.assign(i18n, this.i18n);
    this.apps.forEach((app) => (app.internal = true));
    this.initStorage();
    this.apps.forEach((app) => this.loadApp(app));
    for (const dockname of this.docksConfig) {
      this.initDock(dockname);
    }
    this.webAppDock = new WebAppDock(this);
  }

  async updateApp(app: WebApp) {
    let i = this.appsConfig.findIndex((v) => v.name === app.name);
    if (i >= 0) {
      this.appsConfig[i].title = app.title;
      this.appsConfig[i].css = app.css;
      this.appsConfig[i].script = app.script;
      this.appsConfig[i].proxy = app.proxy;
      this.appsConfig[i].autoIcon = app.autoIcon;
      this.appsConfig[i].allowPopups = app.allowPopups;
      let j = this.apps.findIndex((a) => a.name === app.name)
      this.apps[j] = new WebApp(app);
      this.loadApp(this.apps[j])

      await this.updateStorage();
      showMessage(`Update app ${app.title}`);
    }
  }

  onLayoutReady() {
    this.initHomepageOnEmptyPage();
  }

  loadDataSync(name, parseJson = true) {
    let data;
    $.ajax({
      url: '/api/file/getFile',
      method: 'post',
      async: false,
      data: JSON.stringify({
        path: `/data/storage/petal/siyuan-plugin-webapp/${name}`
      }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (d) {
        data = d;
      }
    });
    if (parseJson) {
      if (typeof data !== 'string') {
        if (data && data.code === 404) {
          return null;
        }
        return data;
      }
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    }
    if (data && data.code === 404) {
      return null;
    }
    return data;
  }

  initStorage() {
    // const data = await this.loadData("apps.txt");
    const data = this.loadDataSync("apps.txt", false);
    if (!data) {
      this.saveData("apps.txt", "[]");
    } else {
      try {
        const arr = typeof data === 'string' ? JSON.parse(data) : data;
        if (Array.isArray(arr)) {
          arr.forEach((a) => {
            a.autoIcon = a.autoIcon === true ? true : false;
            a.allowPopups = a.allowPopups === false ? false : true;
          })
          arr.forEach((conf) => {
            this.appsConfig.push(conf);
            this.apps.push(new WebApp(conf));
          });
        }

      } catch (e) {
        console.error(this.i18n.parseFail, e);
      }
    }
    const docksConfig = this.loadDataSync("docks.json");
    if (!docksConfig) {
      this.saveData("docks.json", []);
    } else {
      this.docksConfig = docksConfig;
    }
    const config = this.loadDataSync("setting.json");
    if (config) {
      this.settingConfig = Object.assign(this.settingConfig, config);
    }
  }

  async updateStorage() {
    const s = JSON.stringify(this.appsConfig, null, 2);
    await this.saveData("apps.txt", s);
    await this.saveData("docks.json", this.docksConfig);
    await this.saveData("setting.json", this.settingConfig);
  }

  addApp(options) {
    const app = new WebApp(options);
    this.loadApp(app);
    this.apps.push(app);
    this.appsConfig.push(options);
    this.updateStorage();
  }

  async remove(name: string) {
    return new Promise((resolve, reject) => {
      confirm(this.i18n.warning, this.i18n.confirmDelete, async () => {
        const i = this.apps.findIndex((v) => v.name === name);
        if (i >= 0) {
          this.apps.splice(i, 1);
        }
        const j = this.appsConfig.findIndex((v) => v.name === name);
        if (j >= 0) {
          this.appsConfig.splice(j, 1);
        }
        const k = this.docksConfig.findIndex((v) => v === name);
        if (k >= 0) {
          this.docksConfig.splice(k, 1);
        }
        await this.updateStorage();
        resolve(name);
      }, () => reject())
    })


  }

  loadApp(app: WebApp) {
    const plugin = this;
    let disconnect;
    if (app.isTopBar) {
      this.addTab({
        type: app.name,
        init() {
          disconnect = renderView(this, plugin);
        },
        beforeDestroy() {
          disconnect && disconnect();
        }
      });
      app.openTab = () =>
        openTab({
          app: this.app,
          custom: {
            icon: app.iconName,
            title: app.title,
            data: {
              ...app,
              i18n: this.i18n,
            },
            id: this.name + app.name,
          },
        });
      return;
    }
  }

  initDock(dockname) {
    const plugin = this;
    const app = this.apps.find((d) => d.name === dockname);
    if (!app) {
      return null;
    }
    let disconnect;
    this.addDock({
      config: {
        position: "RightTop",
        size: { width: 200, height: 0 },
        icon: app.iconName,
        title: app.title,
      },
      data: {
        name: app.name,
        url: app.url,
        script: app.script,
        css: app.css,
        debug: app.debug,
        autoIcon: app.autoIcon,
        allowPopups: app.allowPopups
      },
      type: `${this.name}_${app.name}`,
      init() {
        disconnect = renderView(this, plugin);
      },
      destroy() {
        disconnect && disconnect();
      },
    });
    if (this.docksConfig.find((a) => a === app.name)) {
      return;
    }
    this.docksConfig.push(app.name);
    this.updateStorage().then(() => window.location.reload());
  }

  showApp(name) {
    const i = this.settingConfig.hidden.findIndex((v) => v === name);
    if (i > -1) {
      this.settingConfig.hidden.splice(i, 1);
      this.updateStorage();
    }
  }

  hideApp(name) {
    this.settingConfig.hidden.push(name);
    this.updateStorage();
  }

  toggleHidden() {
    this.settingConfig.showHidden = !this.settingConfig.showHidden;
    this.updateStorage();
  }

  async removeDock(dockname) {
    const i = this.docksConfig.findIndex((v) => v === dockname);
    if (i >= 0) {
      this.docksConfig.splice(i, 1);
      await this.updateStorage();
      window.location.reload();
    }
  }

  updateEmptyPage(el = document) {
    const empty = el.querySelector(".layout__empty");
    if (!empty) {
      return;
    }
    if (this.settingConfig.homepage) {
      const app = this.apps.find((v) => v.name === this.settingConfig.homepage);
      if (!app) {
        return;
      }
      renderView({
        element: empty,
        data: app,
      }, this);
      empty.children[0]?.setAttribute("style", "width: 100%");
    }
  }

  async setHomepage(name) {
    if (this.settingConfig.homepage === name) {
      this.settingConfig.homepage = '';
      await this.updateStorage();
      window.location.reload();
    } else {
      this.settingConfig.homepage = name;
      this.updateStorage();
      this.updateEmptyPage();
    }
  }

  initHomepageOnEmptyPage() {
    const targetNode = document.querySelector(".layout__center");
    const config = { attributes: true, childList: true, subtree: true };
    const callback = (mutationsList) => {
      // Use traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          this.updateEmptyPage(mutation.target);
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    // one shot update
    this.updateEmptyPage();
  }
};

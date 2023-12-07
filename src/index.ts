import { Plugin, confirm, openTab, showMessage } from "siyuan";
import { WebAppDock } from "./WebAppDock";
import { flomo } from "./apps/flomo";
import { cubox, cuboxPro } from "./apps/cubox";
import { dida } from "./apps/dida";
import { i18n } from "./utils";
import { WebApp } from "./WebApp";
import { renderView } from "./utils/render";
import "./index.scss";

export default class WebAppPlugin extends Plugin {
  webAppDock: WebAppDock;

  apps = [flomo, cubox, cuboxPro, dida];

  settingConfig = {
    homepage: "",
    hidden: [],
    showHidden: false,
  };

  appsConfig = [];

  docksConfig = [];

  async onload() {
    Object.assign(i18n, this.i18n);
    this.apps.forEach((app) => (app.internal = true));
    await this.initStorage();
    this.apps.forEach((app) => this.loadApp(app));
    for (const dockname of this.docksConfig) {
      await this.initDock(dockname);
    }
    this.webAppDock = new WebAppDock(this);
  }

  async updateApp(app: WebApp) {
    let i = this.appsConfig.findIndex((v) => v.name === app.name);
    if (i >= 0) {
      this.appsConfig[i] = app;
      const s = JSON.stringify(this.appsConfig, null, 2);
      await this.saveData("apps.txt", s);
      showMessage(`Update app ${app.title}`);
    }
  }

  onLayoutReady() {
    this.initHomepageOnEmptyPage();
  }

  async initStorage() {
    const data = await this.loadData("apps.txt");
    if (!data) {
      await this.saveData("apps.txt", "[]");
    } else {
      try {
        const arr = JSON.parse(data);
        arr.forEach((conf) => {
          this.appsConfig.push(conf);
          this.apps.push(new WebApp(conf));
        });
      } catch (e) {
        console.error(this.i18n.parseFail, e);
      }
    }
    const docksConfig = await this.loadData("docks.json");
    if (!docksConfig) {
      await this.saveData("docks.json", []);
    } else {
      this.docksConfig = docksConfig;
    }
    const config = await this.loadData("setting.json");
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
    if (app.isTopBar) {
      this.addTab({
        type: app.name,
        init() {
          renderView(this);
        },
      });
      app.openTab = () =>
        openTab({
          app: this.app,
          custom: {
            icon: app.iconName,
            title: app.title,
            data: {
              ...app,
            },
            id: this.name + app.name,
          },
        });
      return;
    }
  }

  async initDock(dockname) {
    const app = this.apps.find((d) => d.name === dockname);
    if (!app) {
      return null;
    }
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
      },
      type: `${this.name}_${app.name}`,
      init() {
        renderView(this);
      },
    });
    if (this.docksConfig.find((a) => a === app.name)) {
      return;
    }
    this.docksConfig.push(app.name);
    await this.updateStorage();
    window.location.reload();
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
      });
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

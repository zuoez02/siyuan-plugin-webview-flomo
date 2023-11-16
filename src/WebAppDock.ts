import type WebAppPlugin from './index';
import Dock from './components/dock.svelte';
import { registerIcon } from './utils';

export class WebAppDock {
  webAppPlugin: WebAppPlugin;

  constructor(webAppPlugin: WebAppPlugin) {
    this.webAppPlugin = webAppPlugin;
    this.createIcon();
    this.createDock();
  }

  createIcon() {
    const svg = `<path d="M371.733 94.172q25.773 0 44.112 17.843t18.339 43.617v247.822q0 25.773-18.339 44.112t-44.112 18.34H123.91q-25.774 0-43.617-18.34t-17.843-44.112V155.632q0-25.773 17.843-43.617t43.617-17.843h247.822z m0 495.644q25.773 0 44.112 17.843t18.339 43.617v248.813q0 25.774-18.339 43.617t-44.112 17.843H123.91q-25.774 0-43.617-17.843t-17.843-43.617V651.276q0-25.774 17.843-43.617t43.617-17.843h247.822z m496.635 0q25.773 0 43.617 17.843t17.843 43.617v248.813q0 25.774-17.843 43.617t-43.617 17.843H620.546q-25.773 0-44.112-17.843t-18.34-43.617V651.276q0-25.774 18.34-43.617t44.112-17.843h247.822z m137.789-386.602q19.826 19.826 19.826 46.59t-19.826 45.6l-184.38 184.38q-19.825 19.825-46.095 19.825t-46.094-19.826l-184.38-184.38q-18.834-18.834-18.834-45.599t18.834-46.59l184.38-184.38Q749.413 0 775.682 0t46.095 18.834z"></path>`;
    registerIcon("iconWebApp", "1024", svg);
  }

  createDock() {
    const plugin = this.webAppPlugin;
    this.webAppPlugin.addDock({
      config: {
        position: "LeftBottom",
        size: { width: 200, height: 0 },
        icon: "iconWebApp",
        title: plugin.i18n.title,
      },
      data: {
        apps: this.webAppPlugin.apps,
      },
      type: "WebAppDock",
      init() {
        new Dock({
          target: this.element,
          props: {
            plugin,
          }
        })
      },
    });
  }
}

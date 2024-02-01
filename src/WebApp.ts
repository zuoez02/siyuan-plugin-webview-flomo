import { registerIcon } from "./utils";

export class WebApp {
  name = "";
  iconName = "";
  iconSvg = "";
  iconSymbolSize = 1024;
  title = "";
  isTopBar = false;
  topBarPostion = "right";
  script = "";
  css = "";
  proxy = '';
  url = "";
  debug = false;
  internal = false;
  referer = '';
  openTab: () => void = null;

  constructor(options) {
    this.name = options.name || "";
    this.iconName = options.iconName || "";
    this.iconSvg = options.iconSvg || "";
    this.iconSymbolSize = options.iconSymbolSize || 1024;
    this.title = options.title || "";
    this.isTopBar = options.isTopBar || false;
    this.topBarPostion = options.topBarPostion || "right";
    this.url = options.url || "";
    this.script = options.script || "";
    this.css = options.css || "";
    this.debug = options.debug || false;
    this.proxy = options.proxy || '';
    this.referer = options.referer || '';
    this.loadIcon();
  }

  loadIcon() {
    if (!this.iconSvg || !this.iconName || !this.iconSymbolSize || this.iconName === 'iconHTML5') {
      return;
    }
    registerIcon(this.iconName, this.iconSymbolSize, this.iconSvg);
  }
}
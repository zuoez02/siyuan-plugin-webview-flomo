import { WebApp } from '@/WebApp';
import type { WebviewTag } from 'electron';

export const renderView = (context: { element: Element, data: WebApp }) => {
  /**
   * Browserview Implement
   */
  // const { getCurrentWindow, BrowserView } = window.require('@electron/remote');
  // console.log(context.element);
  // const rect = context.element.getBoundingClientRect();
  // const win = getCurrentWindow();
  // const view = new BrowserView()
  // win.addBrowserView(view)
  // view.setBounds(rect)
  // view.webContents.loadURL(context.data.url)
  // const observer = new ResizeObserver((entries) => {
  //   const rect = context.element.getBoundingClientRect();
  //   view.setBounds(rect);
  // })
  // observer.observe(context.element, { box: 'border-box' });

  // window.addEventListener('beforeunload', () => {
  //   win.removeBrowserView(view);
  // });

  /**
   * Webview Implement
   */
  context.element.innerHTML = `
  <div style="display: flex" class="webapp-view fn__flex-column fn__flex fn__flex-1 ${context.data.name}__custom-tab">
      <!--
      <div id="controller" style="position: absolute; left: 0; top: 0;">
         <span id="refresh">刷新</span>
      </div>
      -->
      <webview allowfullscreen allowpopups style="border: none" class="fn__flex-column fn__flex  fn__flex-1" src="${context.data.url}"
        ${context.data.proxy ? 'partition="' + context.data.name + '"' : ''}></webview>
  </div>`;
  const webview = context.element.querySelector("webview") as WebviewTag;

  if (context.data.proxy) {
    const session = window.require('@electron/remote').session.fromPartition(context.data.name);
    if (session) {
      session.setProxy({
        proxyRules: context.data.proxy,
      })
    }
  }

  if (context.data.script) {
    webview.addEventListener("load-commit", () => {
      const ps = webview.executeJavaScript(context.data.script);
      if (context.data.debug) {
        ps.then(console.log);
      }
    });
  }

  if (context.data.css) {
    webview.addEventListener("load-commit", () => {
      const mode = window.siyuan.config.appearance.mode === 0 ? 'light' : 'dark';
      webview.executeJavaScript(`document.getElementsByTagName('html')[0].setAttribute('siyuan-theme', '${mode}')`).then(() => {
        webview.insertCSS(`:root {
            --siyuan-mode: ${mode};
            --siyuan-theme: ${window.siyuan.config.appearance.mode === 0 ? window.siyuan.config.appearance.themeLight : window.siyuan.config.appearance.themeDark};
          }`).then(() => {
          webview.insertCSS(context.data.css)
        });
      });
    });
  }

  if (context.data.debug) {
    webview.addEventListener("dom-ready", () => {
      webview.openDevTools();
    });
  }

  const panel = context.element.querySelector(
    `.${context.data.name}__custom-tab`
  );

  function hideOverlayer() {
    panel.querySelector(".overlayer")
      ? panel.querySelector(".overlayer").remove()
      : null;
  }
  function showOverLayer() {
    if (!panel.querySelector(".overlayer")) {
      let div = document.createElement("div");
      div.setAttribute(
        "style",
        `position:absolute;bottom:0;left:0;height:${panel.clientHeight}px;width:100%`
      );
      div.setAttribute("class", "overlayer");
      div.addEventListener("mousedown", () => {
        //   siyuanMenu.close();
      });
      panel.appendChild(div);
    }
  }
  document.addEventListener(
    "mousedown",
    () => {
      showOverLayer();
    },
    true
  );
  document.addEventListener(
    "mouseup",
    () => {
      hideOverlayer();
    },
    true
  );
};
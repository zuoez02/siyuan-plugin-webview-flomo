import siyuan from 'siyuan';
import { WebApp } from '@/WebApp';
// import type { WebviewTag } from 'electron';
import * as clipboard from './clipboard';
import WebAppPlugin from '..';
import { nativeImage } from './electron';
import { Electron } from '@/electron';

function base64ToDataURL(
  base64: string,
  mime: string,
): string {
  return `data:${mime};base64,${base64}`;
}

export const renderView = (context: { element: Element, data: WebApp }, plugin: WebAppPlugin) => {
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
      <webview allowfullscreen allowpopups style="border: none" class="fn__flex-column fn__flex  fn__flex-1" src="${context.data.url}"
        ${context.data.proxy ? 'partition="' + context.data.name + '"' : ''}></webview>
      <div class="webapp-view-controller">
        <span class="pointer handle"><svg><use xlink:href="#iconSettings"></use></svg></span> 
        <span class="pointer func home"><svg><use xlink:href="#iconLanguage"></use></svg>${plugin.i18n.home}</span>
        <span class="pointer func refresh"><svg><use xlink:href="#iconRefresh"></use></svg>${plugin.i18n.refresh}</span>
        <span class="pointer func goBack"><svg><use xlink:href="#iconLeft"></use></svg>${plugin.i18n.goBack}</span>
        <span class="pointer func goForward"><svg><use xlink:href="#iconRight"></use></svg>${plugin.i18n.goForward}</span>
        <span>|</span>
        <span class="pointer func zoomIn"><svg><use xlink:href="#iconZoomIn"></use></svg>${plugin.i18n.zoomIn}</span>
        <span class="pointer func zoomOut"><svg><use xlink:href="#iconZoomOut"></use></svg>${plugin.i18n.zoomOut}</span>
        <span class="pointer func zoomRecovery"><svg><use xlink:href="#iconSearch"></use></svg>${plugin.i18n.zoomRecovery}</span>
        <span>|</span>
        <span class="pointer func devtool"><svg><use xlink:href="#iconInlineCode"></use></svg>${plugin.i18n.devtool}</span>
      </div>
      <div class="webapp-view-cover fn__none" style="position: absolute; top: 0; left: 0; height: 100%; width: 100%;"></div>
  </div>`;
  const webview = context.element.querySelector("webview") as any;
  const cover = context.element.querySelector('.webapp-view-cover');
  const controller = context.element.querySelector('.webapp-view-controller');
  webview.addEventListener("dom-ready", () => {
    controller.querySelector('.home').addEventListener('click', () => {
      webview.src = context.data.url;
    });
    controller.querySelector('.refresh').addEventListener('click', () => {
      webview.reload();
    });
    let zoom = [0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.5, 2, 2.5, 3];
    let index = zoom.findIndex(v => v === 1);
    controller.querySelector('.zoomIn').addEventListener('click', () => {
      if (index < zoom.length - 1) {
        index++;
        webview.setZoomFactor(zoom[index]);
      }
    });
    controller.querySelector('.zoomOut').addEventListener('click', () => {
      if (index > 0) {
        index--;
        webview.setZoomFactor(zoom[index]);
      }
    });
    controller.querySelector('.zoomRecovery').addEventListener('click', () => {
      if (index > 0) {
        index = zoom.findIndex(v => v === 1);
        webview.setZoomFactor(zoom[index]);
      }
    });
    controller.querySelector('.goBack').addEventListener('click', () => {
      if (webview.canGoBack()) {
        webview.goBack();
      }
    });
    controller.querySelector('.goForward').addEventListener('click', () => {
      if (webview.canGoForward()) {
        webview.goForward();
      }
    });
    controller.querySelector('.devtool').addEventListener('click', () => {
      if (!webview.isDevToolsOpened()) {
        webview.openDevTools();
      }
    });
  });


  let startDrag = false;
  function onDragStart(e) {
    const el = e.target;
    if (!el) {
      return;
    }
    if (el.getAttribute('data-type') === 'tab-header' || el.parentElement.getAttribute('data-type') === 'tab-header') {
      startDrag = true;
      cover.classList.remove('fn__none');
    }
  }
  function onDragStop() {
    startDrag = false;
    cover.classList.add('fn__none');
  }
  function onResizeStart(e) {
    if (e.target.classList.contains('layout__resize')) {
      startDrag = true;
      cover.classList.remove('fn__none');
    }
  }
  function onResizeStop(e) {
    if (e.target.classList.contains('layout__resize')) {
      startDrag = false;
      cover.classList.add('fn__none');
    }
  }
  document.addEventListener('dragstart', onDragStart, true);
  document.addEventListener('mousedown', onResizeStart, true);
  document.addEventListener('mouseup', onResizeStop, true);
  document.addEventListener('dragend', onDragStop, true);

  let menu;
  // const plugin = context.plugin;
  const i18n = plugin?.i18n;
  webview?.addEventListener?.("context-menu", e => {
    const { params } = e;
    const title = params.titleText || params.linkText || params.altText || params.suggestedFilename;

    // 添加右键菜单
    const items: siyuan.IMenuItemOption[] = [];

    function buildOpenMenuItems(url: string, title: string, action: string, current: boolean = true): siyuan.IMenuItemOption[] {
      const items: siyuan.IMenuItemOption[] = [];

      return items;
    }

    function buildCopyMenuItems(params: Electron.Params): siyuan.IMenuItemOption[] {
      const items: siyuan.IMenuItemOption[] = [];

      /* 复制链接地址 */
      if (params.linkURL) {
        items.push({
          icon: "iconLink",
          label: i18n.menu.copyLinkAddress.label,
          action: "iconLink",
          click: () => clipboard.writeText(params.linkURL),
        });
      }

      /* 复制资源地址 */
      if (params.srcURL) {
        items.push({
          icon: "iconLink",
          label: i18n.menu.copyResourceAddress.label,
          action: "iconCloud",
          click: () => clipboard.writeText(params.srcURL),
        });
      }

      /* 复制框架地址 */
      if (params.frameURL) {
        items.push({
          icon: "iconLink",
          label: i18n.menu.copyFrameAddress.label,
          action: "iconLayout",
          click: () => clipboard.writeText(params.frameURL),
        });
      }

      /* 复制页面地址 */
      if (params.pageURL) {
        items.push({
          icon: "iconLink",
          label: i18n.menu.copyPageAddress.label,
          action: "iconFile",
          click: () => clipboard.writeText(params.pageURL),
        });
      }

      items.push({ type: "separator" });

      /* 复制标题 */
      if (params.titleText) {
        items.push({
          icon: "icon-webview-title",
          label: i18n.menu.copyTitle.label,
          click: () => clipboard.writeText(params.titleText),
        });
      }

      /* 复制描述 */
      if (params.altText) {
        items.push({
          icon: "iconInfo",
          label: i18n.menu.copyAlt.label,
          click: () => clipboard.writeText(params.altText),
        });
      }

      /* 复制锚文本 */
      if (params.linkText) {
        items.push({
          icon: "icon-webview-anchor",
          label: i18n.menu.copyText.label,
          click: () => clipboard.writeText(params.linkText),
        });
      }

      /* 复制文件名 */
      if (params.suggestedFilename) {
        items.push({
          icon: "iconN",
          label: i18n.menu.copyFileName.label,
          click: () => clipboard.writeText(params.suggestedFilename),
        });
      }

      return items;
    }

    function buildMarkdownLink(text: string, url: string, title: string): string {
      text = text || "🔗";
      const markdown: string[] = [];
      markdown.push("[");
      markdown.push(text.replaceAll("]", "\\]").replaceAll("\n", ""));
      markdown.push("](");
      markdown.push(url);
      if (title) {
        markdown.push(` "${title.replaceAll("\n", "").replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`);
      }
      markdown.push(")");
      return markdown.join("");
    }

    function getValidTexts(...args: string[]): string[] {
      return args.filter(text => !!text);
    }

    /* 复制划选内容 */
    if (params.selectionText) {
      items.push({
        icon: "icon-webview-select",
        label: i18n.menu.copySelectionText.label,
        click: () => clipboard.writeText(params.selectionText),
      });
      items.push({ type: "separator" });
    }

    switch (params.mediaType) {
      case "none":
      case "file":
      case "canvas":
      case "plugin":
      default: {
        switch (true) {
          case !!params.linkURL: {
            items.push(...buildOpenMenuItems(params.linkURL, title, "iconLink"));

            items.push({ type: "separator" });

            /* 复制链接 (富文本) */
            items.push({
              icon: "iconLink",
              label: i18n.menu.copyLink.label,
              // accelerator: escapeHTML("<a>"),
              click: () => {
                const a = globalThis.document.createElement("a");
                a.href = params.linkURL;
                a.title = params.titleText;
                a.innerText = params.linkText;
                clipboard.writeHTML(a.outerHTML);
              },
            });

            /* 复制链接 (HTML) */
            items.push({
              icon: "iconHTML5",
              label: i18n.menu.copyLink.label,
              accelerator: "HTML",
              click: () => {
                const a = globalThis.document.createElement("a");
                a.href = params.linkURL;
                a.title = params.titleText;
                a.innerText = params.linkText;
                clipboard.writeText(a.outerHTML);
              },
            });

            /* 复制链接 (Markdown) */
            items.push({
              icon: "iconMarkdown",
              label: i18n.menu.copyLink.label,
              accelerator: "Markdown",
              click: () => {
                const texts = getValidTexts(params.linkText, params.altText, params.suggestedFilename, params.titleText);
                clipboard.writeText(
                  buildMarkdownLink(
                    texts.shift(), //
                    params.linkURL, //
                    texts.pop(), //
                  ),
                );
              },
            });
            break;
          }
          case !!params.frameURL: {
            items.push(...buildOpenMenuItems(params.frameURL, title, "iconLayout"));

            items.push({ type: "separator" });

            /* 复制框架 (富文本) */
            items.push({
              icon: "iconLayout",
              label: i18n.menu.copyFrame.label,
              // accelerator: escapeHTML("<iframe>"),
              click: () => {
                const iframe = globalThis.document.createElement("iframe");
                iframe.src = params.frameURL;
                iframe.title = params.titleText;
                clipboard.writeHTML(iframe.outerHTML);
              },
            });

            /* 复制框架 (HTML) */
            items.push({
              icon: "iconHTML5",
              label: i18n.menu.copyFrame.label,
              accelerator: "HTML",
              click: () => {
                const iframe = globalThis.document.createElement("iframe");
                iframe.src = params.frameURL;
                iframe.title = params.titleText;
                clipboard.writeText(iframe.outerHTML);
              },
            });

            /* 复制框架 (Markdown) */
            items.push({
              icon: "iconMarkdown",
              label: i18n.menu.copyFrame.label,
              accelerator: "Markdown",
              click: () => {
                const texts = getValidTexts(
                  params.linkText, //
                  params.altText, //
                  params.suggestedFilename, //
                  params.titleText, //
                );
                clipboard.writeText(
                  buildMarkdownLink(
                    texts.shift(), //
                    params.frameURL, //
                    texts.pop(), //
                  ),
                );
              },
            });
            break;
          }
          default: {
            items.push(...buildOpenMenuItems(params.pageURL, title, "iconFile", false));

            items.push({ type: "separator" });

            /* 复制页面链接 (富文本) */
            items.push({
              icon: "iconFile",
              label: i18n.menu.copyPage.label,
              // accelerator: escapeHTML("<a>"),
              click: () => {
                const a = globalThis.document.createElement("a");
                a.href = params.pageURL;
                a.title = params.titleText;
                clipboard.writeHTML(a.outerHTML);
              },
            });

            /* 复制页面链接 (HTML) */
            items.push({
              icon: "iconHTML5",
              label: i18n.menu.copyPage.label,
              accelerator: "HTML",
              click: () => {
                const a = globalThis.document.createElement("a");
                a.href = params.pageURL;
                a.title = params.titleText;
                clipboard.writeText(a.outerHTML);
              },
            });

            /* 复制页面链接 (Markdown) */
            items.push({
              icon: "iconMarkdown",
              label: i18n.menu.copyPage.label,
              accelerator: "Markdown",
              click: () => {
                const texts = getValidTexts(
                  params.linkText, //
                  params.altText, //
                  params.suggestedFilename, //
                  params.titleText, //
                );
                clipboard.writeText(
                  buildMarkdownLink(
                    texts.shift(), //
                    params.pageURL, //
                    texts.pop(), //
                  ),
                );
              },
            });
            break;
          }
        }
        break;
      }

      /* 图片 */
      case "image": {
        items.push(...buildOpenMenuItems(params.linkURL, title, "iconImage"));

        items.push({ type: "separator" });

        /* 复制图片 (图片文件) */
        items.push({
          icon: "iconImage",
          label: i18n.menu.copyImage.label,
          click: () => {
            setTimeout(async () => {
              try {
                if (!plugin) {
                  return;
                }
                const response = await plugin.client.forwardProxy({
                  headers: [],
                  method: "GET",
                  responseEncoding: "base64",
                  timeout: 60_000,
                  url: params.srcURL,
                });

                if (200 <= response.data.status && response.data.status < 300) {
                  const data_url = base64ToDataURL(response.data.body, response.data.contentType);
                  const image = nativeImage.createFromDataURL(data_url);
                  clipboard.writeImage(image);
                }
              } catch (error) {
                console.warn(error);
              } finally {
                menu?.close();
              }
            });
            return true;
          },
        });

        /* 复制图片 (富文本) */
        items.push({
          icon: "iconImage",
          label: i18n.menu.copyImage.label,
          // accelerator: escapeHTML("<img>"),
          click: () => {
            const img = globalThis.document.createElement("img");
            img.src = params.srcURL;
            img.title = params.titleText;
            img.alt = params.altText;
            clipboard.writeHTML(img.outerHTML);
          },
        });

        /* 复制图片 (HTML) */
        items.push({
          icon: "iconHTML5",
          label: i18n.menu.copyImage.label,
          accelerator: "HTML",
          click: () => {
            const img = globalThis.document.createElement("img");
            img.src = params.srcURL;
            img.title = params.titleText;
            img.alt = params.altText;
            clipboard.writeText(img.outerHTML);
          },
        });

        /* 复制图片 (Markdown) */
        items.push({
          icon: "iconMarkdown",
          label: i18n.menu.copyImage.label,
          accelerator: "Markdown",
          click: () => {
            const texts = getValidTexts(
              params.altText, //
              params.linkText, //
              params.suggestedFilename, //
              params.titleText, //
            );
            clipboard.writeText(
              buildMarkdownLink(
                texts.shift(), //
                params.srcURL, //
                texts.pop(), //
              ),
            );
          },
        });
        break;
      }

      /* 音频 */
      case "audio": {
        items.push(...buildOpenMenuItems(params.srcURL, title, "iconRecord"));

        items.push({ type: "separator" });

        /* 复制音频 (富文本) */
        items.push({
          icon: "iconRecord",
          label: i18n.menu.copyAudio.label,
          // accelerator: escapeHTML("<audio>"),
          click: () => {
            const audio = globalThis.document.createElement("audio");
            audio.src = params.srcURL;
            audio.title = params.titleText;
            clipboard.writeHTML(audio.outerHTML);
          },
        });

        /* 复制音频 (HTML) */
        items.push({
          icon: "iconHTML5",
          label: i18n.menu.copyAudio.label,
          accelerator: "HTML",
          click: () => {
            const audio = globalThis.document.createElement("audio");
            audio.src = params.srcURL;
            audio.title = params.titleText;
            clipboard.writeText(audio.outerHTML);
          },
        });

        /* 复制音频 (Markdown) */
        items.push({
          icon: "iconMarkdown",
          label: i18n.menu.copyAudio.label,
          accelerator: "Markdown",
          click: () => {
            const texts = getValidTexts(
              params.altText, //
              params.linkText, //
              params.suggestedFilename, //
              params.titleText, //
            );
            clipboard.writeText(
              buildMarkdownLink(
                texts.shift(), //
                params.srcURL, //
                texts.pop(), //
              ),
            );
          },
        });
        break;
      }

      /* 视频 */
      case "video": {
        items.push(...buildOpenMenuItems(params.srcURL, title, "iconVideo"));

        items.push({ type: "separator" });

        /* 复制视频 (富文本) */
        items.push({
          icon: "iconVideo",
          label: i18n.menu.copyVideo.label,
          // accelerator: escapeHTML("<video>"),
          click: () => {
            const video = globalThis.document.createElement("video");
            video.src = params.srcURL;
            video.title = params.titleText;
            clipboard.writeHTML(video.outerHTML);
          },
        });

        /* 复制视频 (HTML) */
        items.push({
          icon: "iconHTML5",
          label: i18n.menu.copyVideo.label,
          accelerator: "HTML",
          click: () => {
            const video = globalThis.document.createElement("video");
            video.src = params.srcURL;
            video.title = params.titleText;
            clipboard.writeText(video.outerHTML);
          },
        });

        /* 复制视频 (Markdown) */
        items.push({
          icon: "iconMarkdown",
          label: i18n.menu.copyVideo.label,
          accelerator: "Markdown",
          click: () => {
            const texts = getValidTexts(
              params.altText, //
              params.linkText, //
              params.suggestedFilename, //
              params.titleText, //
            );
            clipboard.writeText(
              buildMarkdownLink(
                texts.shift(), //
                params.srcURL, //
                texts.pop(), //
              ),
            );
          },
        });
        break;
      }
    }

    /* 复制指定字段 */
    items.push({ type: "separator" });
    items.push(...buildCopyMenuItems(params));

    function washMenuItems(items: siyuan.IMenuItemOption[]): siyuan.IMenuItemOption[] {
      /* 清理首尾两端的分割线 */
      items = items.slice(
        items.findIndex(item => item.type !== "separator"),
        items.findLastIndex(item => item.type !== "separator") + 1,
      );

      if (items.length === 0) return items;

      /* 清理连续的分割线 */
      items = items.filter((item, index, items) => {
        if (item.type !== "separator") return true;
        else return items[index - 1]?.type !== "separator";
      });

      return items;
    }

    const _items = washMenuItems(items);
    if (_items.length > 0) {
      menu = new siyuan.Menu('webviewContextMenu', () => cover.classList.add('fn__none'));
      _items.forEach(item => menu.addItem(item));
      menu.open({
        x: params.x,
        y: params.y,
      });
      cover.classList.remove('fn__none')
    }
  });

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

  return () => {
    document.removeEventListener('dragstart', onDragStart);
    document.removeEventListener('dragend', onDragStop);
    document.removeEventListener('mousedown', onResizeStart);
    document.removeEventListener('mouseup', onResizeStop);
  }
};

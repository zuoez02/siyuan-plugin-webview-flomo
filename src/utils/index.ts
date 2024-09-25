export const i18n: { [key: string]: string } = {};

export function registerIcon(name, size, svg) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <symbol id="${name}" viewBox="0 0 ${size} ${size}">
              ${svg}
          </symbol>
      </defs>
  </svg>`
  );
}

export async function getIconFromUrl(url: string) {
  try {
    return fetch(url).then((res) => {
      return res.text();
    }).then((html) => {
      const dom = new DOMParser().parseFromString(html, "text/html");
      const link = dom.querySelector('link[rel="icon"]');
      if (!link) {
        return;
      }
      return link.getAttribute('href');
    }).then((href) => {
      if (!href) {
        return null;
      }
      const u = new URL(url);
      let d = '';
      if (href.startsWith('https://') || href.startsWith('http')) {
        const h = new URL(href);
        d = h.pathname + h.search;
      } else {
        d = href;
      }
      return fetch(u.origin + d).then((res) => res.blob()).then((blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onloadend = function () {
            const img = new Image();
            img.src = this.result as string;
            img.onload = () => {
              resolve({
                url: this.result as string,
                size: Math.min(img.width, img.height),
              });
            };
          };
          reader.readAsDataURL(blob);
        });
      });
    })
  } catch (e){
    return null;
  }
}

export async function readImageAsBase64(fileEl): Promise<{ url: string, size: number }> {
  return new Promise((resolve, reject) => {
    const file = fileEl.files[0];
    if (!file) {
      resolve(null);
      return;
    }
    if (!/image\/\w+/.test(file.type)) {
      //判断获取的是否为图片文件
      reject(false);
      return false;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const img = new Image();
      img.src = this.result as string;
      img.onload = () => {
        resolve({
          url: this.result as string,
          size: Math.min(img.width, img.height),
        });
      };
    };
  });
}
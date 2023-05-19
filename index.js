const { Plugin, openTab } = require('siyuan');

module.exports = class P extends Plugin {
    async onload() {
        // add icon flomo
        document.body.insertAdjacentHTML('beforeend', `
            <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <symbol id="iconFlomo" viewBox="0 0 1024 1024">
                    <path d="M0 0h1024v1024H0z" fill="#FAFAFA" p-id="2009"></path><path d="M709.461333 507.211852H332.069926V399.559111H779.567407l-65.422222 105.263408c0 2.389333-2.341926 2.389333-4.683852 2.389333zM807.604148 339.749926H450.066963L515.508148 234.477037c2.341926 0 4.67437-2.389333 7.016296-2.389333H877.700741l-65.422222 105.263407c0 2.398815-2.341926 2.398815-4.683852 2.398815z" fill="#30CF79" p-id="2010"></path><path d="M337.910519 791.912296c-105.159111 0-191.620741-88.519111-191.620741-196.181333 0-107.662222 86.46163-196.171852 191.620741-196.171852 105.14963 0 191.620741 88.50963 191.62074 196.171852s-86.471111 196.171852-191.62074 196.171852z m0-282.311111c-46.743704 0-86.471111 38.276741-86.471112 88.519111 0 47.853037 37.394963 88.528593 86.471112 88.528593 49.066667 0 86.46163-38.286222 86.461629-88.528593-2.341926-50.24237-39.727407-88.519111-86.471111-88.519111z" fill="#30CF79" p-id="2011"></path>
                    </symbol>
                </defs>
            </svg>`);

        this.addTopBar({
            icon: 'iconFlomo',
            title: 'Flomo',
            position: 'right',
            callback: () => {
                openTab({
                    custom: {
                        icon: "iconFlomo",
                        title: 'Flomo',
                        data: {
                            filename: 'Flomo',
                            type: 'new',
                        },
                        fn: this.customTab
                    },
                });
            }
        })
        this.customTab = this.addTab({
            type: 'FlomoAppPlugin',
            init() {
                this.element.innerHTML = `<div style="display: flex" class="fn__flex-column fn__flex fn__flex-1 plugin-sample__custom-tab">
                <!--    
                <iframe style="border: none" class="fn__flex-column fn__flex  fn__flex-1" src="/widgets/SuperDraw?filename=${this.data.filename}&type=${this.data.type}&asset_id=${this.data.assetId}"></iframe>
                -->
                    <webview id="wb-flomo" style="border: none" class="fn__flex-column fn__flex  fn__flex-1" src="https://v.flomoapp.com/mine"></webview>
                </div>`;
            },
        });
    }
}
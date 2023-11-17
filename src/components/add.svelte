<script lang="ts">
  import { i18n, readImageAsBase64 } from "@/utils";
  import WebAppPlugin from "..";
  import { Dialog } from "siyuan";

  let appname = "";
  let appurl = "";
  let appfile = null;
  let appproxy = "";

  const cancel = () => {
    reject();
  };

  const submit = async () => {
    try {
      const res = await readImageAsBase64(appfile);
      const name = appname;
      const options = {
        name: name,
        iconName: res ? `icon${name}` : "iconHTML5",
        iconSvg: res ? `<image href="${res.url}" />` : "",
        iconSymbolSize: res ? res.size : 0,
        title: name,
        isTopBar: true,
        topBarPostion: "right",
        url: appurl,
        proxy: appproxy,
      };
      plugin.addApp(options);
      dialog.destroy();
      resolve();
    } catch (e) {
      console.error(e);
      return;
    }
  };

  export let plugin: WebAppPlugin;
  export let resolve: any;
  export let reject: any;
  export let dialog: Dialog;
</script>

<div class="b3-dialog__content">
  <div class="b3-dialog-input">
    <label for="appname">{i18n.appname}</label>
    <input
      class="b3-text-field fn__block"
      type="input"
      name="appname"
      id="appname"
      bind:value={appname}
    />
  </div>
  <div class="b3-dialog-input">
    <label for="appurl">URL</label>
    <input
      class="b3-text-field fn__block"
      type="input"
      name="appurl"
      id="appurl"
      bind:value={appurl}
    />
  </div>
  <div class="b3-dialog-input">
    <label for="appproxy">Proxy</label>
    <input
      class="b3-text-field fn__block"
      type="input"
      name="appproxy"
      id="appproxy"
      bind:value={appproxy}
    />
  </div>
  <div class="b3-dialog-input">
    <label for="appfile">LOGO</label>
    <input
      class="fn__block"
      type="file"
      name="appfile"
      id="appfile"
      bind:this={appfile}
    />
  </div>
</div>
<div class="b3-dialog__content">
  <p>{i18n.attention}</p>
</div>
<div class="b3-dialog__action">
  <button class="b3-button b3-button--cancel" on:click={() => cancel()}
    >{i18n.cancel}</button
  >
  <div class="fn__space" />
  <button class="b3-button b3-button--text" on:click={() => submit()}
    >{i18n.add}</button
  >
</div>

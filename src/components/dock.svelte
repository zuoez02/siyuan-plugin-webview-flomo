<script lang="ts">
  import { i18n } from "@/utils";
  import WebAppPlugin from "..";
  import { onMount } from "svelte";
  import { WebApp } from "@/WebApp";
  import { Dialog, Menu } from "siyuan";
  import Add from "./add.svelte";
  import { SettingDialog } from "./setting-dialog";
  import { Tree } from "siyuan-kit-svelte";

  let showHidden = false;
  let hidden: string[] = [];
  let apps: WebApp[] = [];

  $: shownApps = apps.filter(
    (v) => showHidden || hidden.every((g) => g !== v.name)
  );

  $: treeNodes = shownApps.map((v) => ({ ...v, nodeId: v.name, icon: v.iconName }));

  $: hiddenBtnLabel = showHidden ? i18n.hideHidden : i18n.showHidden;

  $: hiddenBtnIcon = showHidden ? "#iconEyeoff" : "#iconEye";

  const isInDock = (name: string) => plugin.docksConfig.some((v) => v === name);

  const actions = (app: WebApp) => {
    const result = [];
    if (isInDock(app.name)) {
      result.push({
        type: "removeDock",
        icon: "iconHideDock",
        title: i18n.deleteDock,
        callback: (app) => {
          removeDock(app);
        },
      });
    } else {
      result.push({
        type: "addDock",
        icon: "iconDock",
        title: i18n.addToDock,
        callback: (app) => {
          addDock(app);
        },
      });
    }
    result.push({
      type: "homepage",
      icon: "iconLanguage",
      title: i18n.setAsHomepage,
      callback: (app) => setHomepage(app),
    });
    if (!app.internal) {
      result.push({
        type: "deleteapp",
        icon: "iconTrashcan",
        title: i18n.removeApp,
        callback: (app) => deleteApp(app),
      });
    }
    if (hidden.indexOf(app.name) > -1) {
      result.push({
        type: "showApp",
        icon: "iconEye",
        title: i18n.showApp,
        callback: (app) => showApp(app),
      });
    } else {
      result.push({
        type: "hideApp",
        icon: "iconEyeoff",
        title: i18n.hideApp,
        callback: (app) => hideApp(app),
      });
    }
    return result;
  };

  onMount(() => {
    loadDataFromPlugin();
  });

  const showCreateAppDialog = () => {
    return new Promise((resolve, reject) => {
      const dialog = new Dialog({
        title: i18n.dialogAdd,
        content: `<div id="dock-add"></div>`,
        width: "520px",
      });
      new Add({
        target: dialog.element.querySelector("#dock-add"),
        props: {
          plugin,
          resolve,
          reject,
          dialog,
        },
      });
    });
  };

  const addApp = () => {
    showCreateAppDialog().then(() => {
      loadDataFromPlugin();
    });
  };

  const openTab = (app: WebApp) => {
    app.openTab();
  };

  const loadDataFromPlugin = () => {
    apps = [...plugin.apps];
    showHidden = plugin.settingConfig.showHidden;
    hidden = plugin.settingConfig.hidden;
  };

  const deleteApp = (app: WebApp) => {
    plugin.remove(app.name).then(() => {
      loadDataFromPlugin();
    });
  };

  const addDock = (app) => plugin.initDock(app.name);

  const removeDock = (app) => plugin.removeDock(app.name);

  const hideApp = (app) => {
    plugin.hideApp(app.name);
    loadDataFromPlugin();
  };

  const showApp = (app) => {
    plugin.showApp(app.name);
    loadDataFromPlugin();
  };

  const toggleHidden = () => {
    plugin.toggleHidden();
    loadDataFromPlugin();
  };

  const setHomepage = (app) => {
    plugin.setHomepage(app.name);
  };

  const onContextMenu = (event: MouseEvent, app: WebApp) => {
    const forbidden = ["flomo", "cubox", "cuboxChina", "dida"];
    if (forbidden.indexOf(app.name) > -1) {
      return;
    }
    let pos = {
      x: event.clientX,
      y: event.clientY,
    };
    const menu = new Menu("webapp-config");
    menu.addItem({
      label: "自定义配置",
      icon: "iconTheme",
      click: () => {
        const dialog = new SettingDialog(
          app,
          (title: string, css: string, script: string) => {
            app.title = title;
            app.css = css;
            app.script = script;
            shownApps = shownApps; //刷新
            plugin.updateApp(app);
          }
        );
        dialog.show();
      },
    });
    menu.open(pos);
  };

  export let plugin: WebAppPlugin;
</script>

<div class="fn__flex-1 fn__flex-column">
  <div class="block__icons">
    <div class="block__logo">
      <svg><use xlink:href="#iconWebApp" /></svg>
      {i18n.title}
    </div>
    <span class="fn__flex-1 fn__space" />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      on:click={() => toggleHidden()}
      id="hidden-webapp"
      class="block__icon b3-tooltips b3-tooltips__sw"
      aria-label={hiddenBtnLabel}
      ><svg><use xlink:href={hiddenBtnIcon} /></svg></span
    >
    <span
      data-type="min"
      class="block__icon b3-tooltips b3-tooltips__sw"
      aria-label={i18n.min}><svg><use xlink:href="#iconMin" /></svg></span
    >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      on:click={() => addApp()}
      id="add-webapp"
      class="block__icon b3-tooltips b3-tooltips__sw"
      aria-label={i18n.create}><svg><use xlink:href="#iconAdd" /></svg></span
    >
  </div>

  <div class="fn__flex-1 plugin-webapp_custom-dock">
    <Tree bind:treeNodes {actions} hideActions hideArrowWhenOnlyOneLevel={true}>
      <div
        slot="title"
        let:node={app}
        on:contextmenu={(e) => {
          onContextMenu(e, app);
        }}
      >
        <span style="flex: 1">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span on:click={() => openTab(app)}>{app.title}</span>
          {#if app.script}
            <span class="b3-tooltips b3-tooltips__e" aria-label={i18n.hasScript}
              ><svg class="inline-icon"><use xlink:href="#iconSparkles" /></svg></span
            >
          {/if}
          {#if app.css}
            <span class="b3-tooltips b3-tooltips__e" aria-label={i18n.hasCss}
              ><svg class="inline-icon"><use xlink:href="#iconTheme" /></svg></span
            >
          {/if}
          {#if app.debug}
            <span class="b3-tooltips b3-tooltips__e" aria-label={i18n.hasDebug}
              ><svg class="inline-icon"><use xlink:href="#iconBug" /></svg></span
            >
          {/if}
        </span>
      </div>
    </Tree>

  </div>
</div>

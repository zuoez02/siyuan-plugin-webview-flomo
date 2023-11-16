<script lang="ts">
  import { i18n } from "@/utils";
  import WebAppPlugin from "..";
  import { onMount } from "svelte";
  import { WebApp } from "@/WebApp";
  import { Dialog } from "siyuan";
  import Add from "./add.svelte";

  let showHidden = false;
  let hidden: string[] = [];
  let apps: WebApp[] = [];
  let homepage = "";

  $: shownApps = apps.filter(
    (v) => showHidden || hidden.every((g) => g !== v.name)
  );

  $: hiddenBtnLabel = showHidden ? i18n.hideHidden : i18n.showHidden;

  $: hiddenBtnIcon = showHidden ? "#iconEyeoff" : "#iconEye";

  const isInDock = (name: string) => plugin.docksConfig.some((v) => v === name);

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
    homepage = plugin.settingConfig.homepage;
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
    homepage = app.name;
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
    {#each shownApps as app}
      <div
        class="webapp"
        style="display: flex; align-items: center; gap: 3px;"
        data-name={app.name}
      >
        <svg><use xlink:href={"#" + app.iconName} /></svg>
        <span style="flex: 1">
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span on:click={() => openTab(app)}>{app.title}</span>
          {#if app.script}
            <span class="b3-tooltips b3-tooltips__e" aria-label={i18n.hasScript}
              ><svg><use xlink:href="#iconSparkles" /></svg></span
            >
          {/if}
          {#if app.css}
            <span class="b3-tooltips b3-tooltips__e" aria-label={i18n.hasCss}
              ><svg><use xlink:href="#iconTheme" /></svg></span
            >
          {/if}
          {#if app.debug}
            <span class="b3-tooltips b3-tooltips__e" aria-label={i18n.hasDebug}
              ><svg><use xlink:href="#iconBug" /></svg></span
            >
          {/if}
        </span>
        {#if isInDock(app.name)}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class="func-btn b3-tooltips b3-tooltips__w"
            on:click={() => removeDock(app)}
            aria-label={i18n.deleteDock}
            data-name={app.name}
            ><svg><use xlink:href="#iconHideDock" /></svg></span
          >
        {:else}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class="func-btn b3-tooltips b3-tooltips__w"
            on:click={() => addDock(app)}
            aria-label={i18n.addToDock}
            data-name={app.name}><svg><use xlink:href="#iconDock" /></svg></span
          >
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <span
          class="func-btn homepageapp b3-tooltips b3-tooltips__w"
          on:click={() => setHomepage(app)}
          aria-label={i18n.setAsHomepage}
          data-name={app.name}
          ><svg><use xlink:href="#iconLanguage" /></svg></span
        >
        {#if !app.internal}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            class="func-btn deleteapp b3-tooltips b3-tooltips__w"
            on:click={() => deleteApp(app)}
            aria-label={i18n.removeApp}
            data-name={app.name}
            ><svg><use xlink:href="#iconTrashcan" /></svg></span
          >
        {/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if hidden.indexOf(app.name) > -1}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <span
            on:click={() => showApp(app)}
            class="func-btn b3-tooltips b3-tooltips__w"
            aria-label={i18n.showApp}
            data-name={app.name}><svg><use xlink:href="#iconEye" /></svg></span
          >
        {:else}
          <span
            on:click={() => hideApp(app)}
            class="func-btn b3-tooltips b3-tooltips__w"
            aria-label={i18n.hideApp}
            data-name={app.name}
            ><svg><use xlink:href="#iconEyeoff" /></svg></span
          >
        {/if}
      </div>
    {/each}
  </div>
</div>

import type { Electron } from "@/electron";

export interface IElectron {
    clipboard: Electron.Clipboard;
    contextBridge: Electron.ContextBridge;
    crashReporter: Electron.CrashReporter;
    ipcRenderer: Electron.IpcRenderer;
    nativeImage: typeof Electron.NativeImage;
    shell: Electron.Shell;
    webFrame: Electron.WebFrame;
}

export const electron: IElectron = globalThis
    ?.require
    ?.("electron");

export default electron;

export const clipboard = electron?.clipboard;
export const contextBridge = electron?.contextBridge;
export const crashReporter = electron?.crashReporter;
export const ipcRenderer = electron?.ipcRenderer;
export const nativeImage = electron?.nativeImage;
export const shell = electron?.shell;
export const webFrame = electron?.webFrame;
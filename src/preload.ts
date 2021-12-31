const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ipc', {
    getVersion() {
        return new Promise((res, rej) => {    
            ipcRenderer.send("getVersion");
            ipcRenderer.on("replyVersion", (event, arg) => {
                res(arg);
            });
        });
    },
    openSaveDialog() {
        return new Promise((res, rej) => {
            ipcRenderer.send("openSaveDialog");
            ipcRenderer.on("saveDialogCanceled", (event, arg) => {
                res(arg);
            });
        })
    }
});
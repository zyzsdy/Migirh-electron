import { app, BrowserWindow, Menu, ipcMain, dialog } from "electron";
import startApp, { LocalToken } from './serverapp';
import * as path from 'path';

function main() {
    //单例锁
    let mainWindow: BrowserWindow = null;
    const singleInstanceLock = app.requestSingleInstanceLock();

    if (!singleInstanceLock) {
        app.quit(); //已经存在一个实例了，本实例自行退出
    } else {
        app.on("second-instance", (event, commandLine, workingDirectory) => {
            if (mainWindow) {
                mainWindow.show();
                if (mainWindow.isMinimized()) {
                    mainWindow.restore();
                }
                mainWindow.focus();
            }
        });

        app.on("ready", async () => {

            if (process.env.NODE_ENV && process.env.NODE_ENV.startsWith("develop")) {
                createWindowForDev(mainWindow);
            } else {
                const [port, child, localToken] = await startApp();
                createWindow(mainWindow, port, localToken);

                app.on("activate", function () {
                    if (BrowserWindow.getAllWindows().length === 0) {
                        createWindow(mainWindow, port, localToken);
                    };
                });
            }
            Menu.setApplicationMenu(null);

            //hide menu for mac
            if (process.platform === "darwin") {
                app.dock.hide();
            }
        });

        app.on("window-all-closed", () => {
            if (process.platform !== "darwin") {
                app.quit();
            }
        });

        ipcMain.on("getVersion", (event, arg) => {
            console.log("signal: getVersion");
            event.reply("replyVersion", "16.0.5");
        });

        ipcMain.on("openSaveDialog", async (event, arg) => {
            console.log("signal: openSaveDialog");

            let result = await dialog.showOpenDialog(mainWindow, {
                properties: ['openDirectory', 'promptToCreate', 'createDirectory']
            });
            console.log(result);
            event.reply("saveDialogCanceled", result);
        });
    }
}

function createWindow(mainWindow: BrowserWindow, port: number, localToken: LocalToken) {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadURL(`http://127.0.0.1:${port}/login?localToken=${localToken.token}&localSk=${localToken.sk}`);
}

function createWindowForDev(mainWindow: BrowserWindow) {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadURL("http://127.0.0.1:3000/login?localToken=weQqKo8EY4ZXf86oNWGTo_ZDu6s=&localSk=xYjkX7dsgfqZtQmdNxNxBY33Two=");

    mainWindow.webContents.openDevTools();
}

//RUN MAIN FUNCTION
main();
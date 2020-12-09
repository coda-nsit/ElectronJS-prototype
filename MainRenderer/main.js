
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

// create two BrowserWindows
// from BrowserWindow #2 create a new BrowserWindow
let win;

function createWindow() {
    win_1 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    win_2 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win_1.loadURL(url.format({
        // load the html file that user will see
        pathname: path.join(__dirname, "one.html"),
        // protocol is file, i.e. the UI should come from a file and not via http
        protocol: "file",
        slashes: true
    }));
    win_2.loadURL(url.format({
        // load the html file that user will see
        pathname: path.join(__dirname, "two.html"),
        // protocol is file, i.e. the UI should come from a file and not via http
        protocol: "file",
        slashes: true
    }));

    // if we want to enable to open dev tools in the application
    win_1.webContents.openDevTools();
    win_2.webContents.openDevTools();

    // what to do when the window is closed
    win_1.on("closed", () => {
        // garbage collect the window
        win_1 = null;
    })

    win_2.on("closed", () => {
        // garbage collect the window
        win_2 = null;
    })
}

// when app has done the initialization call the function
app.on("ready", createWindow);

// this is for MAC only: when all the windows are closed we need to explicitely quit the application
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
})

// this is for MAC only: when there are no windows open and we need to create browser window again
app.on("activate", () => {
    if (win_1 === null) {
        createWindow();
    }
    if (win_2 === null) {
        createWindow();
    }
})
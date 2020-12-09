
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

// 1. reference to the window
// 2. create the window
// 3. create event handlers
let win;

function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        // load the html file that user will see
        pathname: path.join(__dirname, "index.html"),
        // protocol is file, i.e. the UI should come from a file and not via http
        protocol: "file",
        slashes: true
    }));

    // if we want to enable to open dev tools in the application
    win.webContents.openDevTools();

    // what to do when the window is closed
    win.on("closed", () => {
        // garbage collect the window
        win = null;
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
    if (win === null) {
        createWindow();
    }
})
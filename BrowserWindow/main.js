
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

// 1. reference to the window
// 2. create the window
// 3. create event handlers
let vanillaWindow, dimWindow, colorWindow, framelessWindow, parentWindow, childWindow;

function createWindow() {
    vanillaWindow = new BrowserWindow();
    vanillaWindow.loadURL(url.format({
        // load the html file that user will see
        pathname: path.join(__dirname, "index.html"),
        // protocol is file, i.e. the UI should come from a file and not via http
        protocol: "file",
        slashes: true
    }));
    dimWindow = new BrowserWindow({
        width: 400,
        height: 400,
        maxWidth: 800,
        maxHeight: 600
    });
    dimWindow.loadURL(url.format({
        // load the html file that user will see
        pathname: path.join(__dirname, "index.html"),
        // protocol is file, i.e. the UI should come from a file and not via http
        protocol: "file",
        slashes: true
    }));
    
    colorWindow = new BrowserWindow({
        backgroundColor: "orange"
    });
    colorWindow.loadURL(url.format({
        // load the html file that user will see
        pathname: path.join(__dirname, "index.html"),
        // protocol is file, i.e. the UI should come from a file and not via http
        protocol: "file",
        slashes: true
    }));
    framelessWindow = new BrowserWindow({
        frame: false
    });
    framelessWindow.loadURL(url.format({
        // load the html file that user will see
        pathname: path.join(__dirname, "index.html"),
        // protocol is file, i.e. the UI should come from a file and not via http
        protocol: "file",
        slashes: true
    }));

    // if we want to enable to open dev tools in the application
    vanillaWindow.webContents.openDevTools();
    dimWindow.webContents.openDevTools();
    colorWindow.webContents.openDevTools();
    framelessWindow.webContents.openDevTools();

    // what to do when the window is closed
    vanillaWindow.on("closed", () => {
        // garbage collect the window
        vanillaWindow = null;
    })
    colorWindow.on("closed", () => {
        // garbage collect the window
        colorWindow = null;
    })
    framelessWindow.on("closed", () => {
        // garbage collect the window
        framelessWindow = null;
    })
    dimWindow.on("closed", () => {
        // garbage collect the window
        dimWindow = null;
    })

    parentWindow = new BrowserWindow({
        title: "parent window"
    });
    childWindow = new BrowserWindow({
        show: false, // don't show the child window right away, show only when it is ready i.e. ready-to-show
        parent: parentWindow,
        title: "child window",
        modal: true  // child window shown only when parent window completes something 
    });
    childWindow.loadURL("https://github.com");
    childWindow.once("ready-to-show", () => {
        childWindow.show();
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
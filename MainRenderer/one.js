console.log("one.js is logged");
const BrowserWindow = require("electron").remote.BrowserWindow;
const path = require("path");
const url = require("url");

const newWindowButton = document.getElementById("create-renderer-3");
newWindowButton.addEventListener("click", function(event) {
    let win_3 = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    win_3.loadURL(url.format({
        pathname: path.join(__dirname, "three.html"),
        protocol: "file",
        slashes: true
    }));
    win_3.webContents.openDevTools();
})
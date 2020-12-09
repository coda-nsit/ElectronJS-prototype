const electron = require("electron");
const ipc = electron.ipcRenderer;

const errorBtn = document.getElementById("error-button");

// send msg to main.js
errorBtn.addEventListener("click", () => {
    ipc.send("open-error-dialog");
});

// recieve msg from main.js
ipc.on("opened-error-dialog", (event, args) => {
    console.log(args);
});

// this window is created in the main process itself, since it is invoked using the remote BrowserWindow. 
// These handling is done using synchronous IPC
const BrowserWindow = electron.remote.BrowserWindow;
let window = new BrowserWindow();
window.loadURL("https://github.com");
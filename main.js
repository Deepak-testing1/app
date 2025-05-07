const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require("electron");
const path = require("path");
//let mainMenu = Menu.buildFromTemplate(require("main/menu.js"));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 550,
    height: 450,
    frame: false,
    resizable: false,
    movable: false,
    fullscreen: false,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "preload.js"),
      //contextIsolation: true,
      contextIsolation: false,
      //nodeIntegration: false,
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
  // mainWindow.webContents.openDevTools()
}
ipcMain.on("secondwindow", () => {
  const mainWindow = new BrowserWindow({
    width: 1330,
    height: 720,
    minWidth: 1080,
    minHeight: 720,
    frame: true,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "main/preload2.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  mainWindow.setMenu(null);
  mainWindow.loadFile("main/second.html");
  mainWindow.maximize();
  // mainWindow.webContents.openDevTools()
});

app.whenReady().then(() => {
  createWindow();
  //secondWindow();
  console.log("App is ready");

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

const { ipcRenderer } = require("electron");
console.log("Renderer");

const button = document.getElementById("login-button");
const username = document.getElementById("username");
const password = document.getElementById("password");
const exitButton = document.getElementById("btn1");

window.addEventListener("DOMContentLoaded", () => {
  exitButton.addEventListener("click", () => {
    window.close();
  });
  button.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "admin") {
      showCustomAlert("Success", "Login successful", () => {
        // window.electronAPI.secondWindow();
        ipcRenderer.send("secondwindow");
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        console.log("Cleared inputs");
        window.close();

        //window.location.href = "second.html";
      });
    } else {
      showCustomAlert("Error", "Password or username is incorrect", () => {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        console.log("Cleared inputs");
      });
    }
  });
});

function showCustomAlert(title, message, callback) {
  const alertOverlay = document.getElementById("customAlert");
  const alertTitle = alertOverlay.querySelector(".alert-title");
  const alertMessage = alertOverlay.querySelector(".alert-message");
  const alertOkBtn = document.getElementById("alertOkBtn");

  alertTitle.textContent = title;
  alertMessage.textContent = message;

  alertOverlay.style.display = "flex";

  alertOkBtn.onclick = () => {
    alertOverlay.style.display = "none";
    if (callback) callback(); // Run callback like redirect
  };
}

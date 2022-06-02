var body = document.getElementsByTagName("body")[0];
var nightbtn = document.getElementById("night-mode");
var boldTexts = document.querySelectorAll("[bold-text]");
var sideBar = document.getElementById("colorlib-main-nav");
let isLight = true;

nightbtn.addEventListener("click", modeSwitch);

function modeSwitch() {
  isLight = !isLight;
  if (isLight) {
    nightbtn.innerHTML = "Night Mode off";
    body.style.background = "#fafafa";
    [...boldTexts].forEach((boldtext) => {
      boldtext.style.color = "#f0f0f0";
    });
    sideBar.style.background = "#fafafa";
  } else {
    nightbtn.innerHTML = `Night Mode on <i class="icon-moon"></i> `;
    body.style.background = "#1b1a1afa";
    [...boldTexts].forEach((boldtext) => {
      boldtext.style.color = "#8c8b8b";
    });
    sideBar.style.background = "rgb(5 4 4 / 98%)";
  }
}

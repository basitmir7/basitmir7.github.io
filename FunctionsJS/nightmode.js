var body = document.getElementsByTagName("body")[0];
var nightbtn = document.getElementById("night-mode");
var boldTexts = document.querySelectorAll("[bold-text]");
var sideBar = document.getElementById("colorlib-main-nav");
var menuLine = document.getElementById("menu-line");
var nightTune = new Audio("./music/s-night.mp3");
var dayTune = new Audio("./music/s-day.mp3");
let darkMode = localStorage.getItem("dark-mode");

const disableDarkMode = () => {
  nightbtn.innerHTML = "Night Mode off";

  dayTune.play();
  body.style.background = "#fafafa";
  [...boldTexts].forEach((boldtext) => {
    boldtext.style.color = "#f0f0f0";
  });
  sideBar.style.background = "#fafafa";
  localStorage.setItem("dark-mode", "disabled");
};

const enableDarkMode = () => {
  nightbtn.innerHTML = `Night Mode on <i class="icon-moon"></i> `;

  nightTune.play();
  body.style.background = "#1b1a1afa";
  [...boldTexts].forEach((boldtext) => {
    boldtext.style.color = "#8c8b8b";
  });
  sideBar.style.background = "rgb(5 4 4 / 98%)";
  localStorage.setItem("dark-mode", "enabled");
};

if (darkMode === "enabled") {
  enableDarkMode(); // set state of darkMode on page load
  nightTune.pause();
}

nightbtn.addEventListener("click", (e) => {
  darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});

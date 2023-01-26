// var body = document.getElementsByTagName("body")[0];
// var nightbtn = document.getElementById("night-mode");
// var boldTexts = document.querySelectorAll("[bold-text]");
// var sideBar = document.getElementById("colorlib-main-nav");
// var menuLine = document.getElementById("menu-line");
// var nightTune = new Audio("./music/s-night.mp3");
// var dayTune = new Audio("./music/s-day.mp3");
// let darkMode = localStorage.getItem("dark-mode");

// const disableDarkMode = () => {
//   nightbtn.innerHTML = "Night Mode off";

//   dayTune.play();
//   body.classList.remove("nightBody");
//   [...boldTexts].forEach((boldtext) => {
//     boldtext.style.color = "#e4e4e4";
//   });
//   sideBar.style.background = "#fafafa";
//   localStorage.setItem("dark-mode", "disabled");
// };

// const enableDarkMode = () => {
//   nightbtn.innerHTML = `Night Mode on <i class="icon-moon"></i> `;

//   nightTune.play();
//   body.classList.add("nightBody");
//   [...boldTexts].forEach((boldtext) => {
//     boldtext.style.color = "#8c8b8b ";
//   });
//   sideBar.style.background = "rgb(5 4 4 / 98%)";
//   localStorage.setItem("dark-mode", "enabled");
// };

// if (darkMode === "enabled") {
//   enableDarkMode(); // set state of darkMode on page load
//   nightTune.pause();
// }

// nightbtn.addEventListener("click", (e) => {
//   darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
//   if (darkMode === "disabled") {
//     enableDarkMode();
//   } else {
//     disableDarkMode();
//   }
// });

var COLOR_one = document.getElementById("first-bg");
var COLOR_two = document.getElementById("second-bg");
var COLOR_three = document.getElementById("third-bg");
var Body = document.getElementById("body");

COLOR_one.addEventListener("mouseover", () => {
  Body.style.background = "rgb(189,190,238)";
});
COLOR_one.addEventListener("mouseout", () => {
  Body.style.background = "#e8e5e2";
});

COLOR_two.addEventListener("mouseover", () => {
  Body.style.background = "rgb(245,151,148)";
});
COLOR_two.addEventListener("mouseout", () => {
  Body.style.background = "#e8e5e2";
});

COLOR_three.addEventListener("mouseover", () => {
  Body.style.background = "rgb(208,148,234)";
});
COLOR_three.addEventListener("mouseout", () => {
  Body.style.background = "#e8e5e2";
});

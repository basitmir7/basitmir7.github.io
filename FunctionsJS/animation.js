// var helloText = document.getElementById("bold-hello");
// var musicBtn = document.getElementById("music-button");
// var audio = new Audio("./music/song.mp3");
// var isPlaying = false;
// var boldTexts = document.querySelectorAll("[bold-text]");
// var body = document.getElementsByTagName("body")[0];

// musicBtn.addEventListener("click", togglePlay);
// animateHello();
// function animateHello() {
//   helloText.classList.add("animate-hello");
// }

// function togglePlay() {
//   if (isPlaying) {
//     audio.pause();
//     [...boldTexts].forEach((boldtext) => {
//       boldtext.classList.remove("bold-text-animate");
//     });
//     body.classList.remove("body-dance");
//     musicBtn.innerHTML = `<i class="icon-music"></i>`;
//     musicBtn.style.color = "rgb(110, 110, 110)";
//   } else {
//     audio.play();
//     [...boldTexts].forEach((boldtext) => {
//       boldtext.classList.add("bold-text-animate");
//     });

//     body.classList.add("body-dance");

//     musicBtn.style.color = "#fb5353";
//   }
// }

// audio.onplaying = function () {
//   isPlaying = true;
// };
// audio.onpause = function () {
//   isPlaying = false;
// };

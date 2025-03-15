let starButtons = document.getElementsByClassName("star");
let shareButtons = document.getElementsByClassName("share");
let githubButtons = document.getElementsByClassName("github");


let project_list = ["https://github.com/bimal-gajera/Rock-Paper-Scissor",
  "https://github.com/bimal-gajera/JARVIS",
  "https://github.com/bimal-gajera/Web-Calculator",
  "https://github.com/bimal-gajera/Etch-a-Sketch",
  "https://github.com/bimal-gajera/Landing-Page",
  "https://github.com/bimal-gajera/odin-recipes"];


for (let i = 0; i < starButtons.length; i++) {
  starButtons[i].addEventListener("click", () => {
    let star_img = starButtons[i].children[0].src;
    if (star_img.slice(-8) == "star.svg") {
      starButtons[i].children[0].src = "./assets/star-gold.svg";
    }
    else {
      starButtons[i].children[0].src = "./assets/star.svg";
    }
  });

  shareButtons[i].addEventListener(("click"), () => {
    navigator.clipboard.writeText(project_list[i]);
    console.log(project_list[i]);
  });

  githubButtons[i].addEventListener("click", () => {
    window.open(project_list[i]);
  });
}


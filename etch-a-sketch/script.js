document.addEventListener("DOMContentLoaded", () => {
  main();
});

let boardDiv = document.getElementById("board");
let boardcontrolLeftDiv = document.getElementById("boardControlsLeft");
let boardcontrolRightDiv = document.getElementById("boardControlsRight");
let gridSize = 16;

let changeGridBtn = document.createElement("BUTTON");
changeGridBtn.textContent = "Resize Grid";
changeGridBtn.id = "gridSizeBtn";
boardcontrolLeftDiv.appendChild(changeGridBtn);
changeGridBtn.addEventListener("click", () => {
  gridSize = prompt("Enter grid size: ");
  changeGridSize(gridSize);
});


let toggleGridBtn = document.createElement("button");
toggleGridBtn.textContent = "Disable Grid";
toggleGridBtn.id = "toggleGrid";
toggleGridBtn.addEventListener("click", () => {
  toggleGrid();
});
boardcontrolLeftDiv.appendChild(toggleGridBtn);

function toggleGrid() {
  let gridBtn = document.getElementById("toggleGrid");
  let blockArr = document.getElementsByClassName("block");
  const blocks = Array.from(blockArr);
  blocks.forEach(block => {
    block.classList.toggle('blockborder');
  });
  if (gridBtn.textContent == "Disable Grid") {
    gridBtn.textContent = "Enable Grid";
    gridBtn.style.backgroundColor = "gray";
  }
  else {
    gridBtn.textContent = "Disable Grid";
    gridBtn.style.backgroundColor = "black";
  }
}


let selectedColor = "black";
let colorMode = "color palette";
// color palette, random color, eraser

let colorModeBtn = document.createElement("select");
colorModeBtn.id = "colormode";
let mode1 = document.createElement("option");
mode1.text = "color palette";
colorModeBtn.add(mode1);
let mode2 = document.createElement("option");
mode2.text = "random color";
colorModeBtn.add(mode2);

boardcontrolRightDiv.appendChild(colorModeBtn);

colorModeBtn.onchange = function () {
  colorMode = colorModeBtn.value;
};


let eraserBtn = document.createElement("button");
eraserBtn.textContent = "Eraser";
eraserBtn.id = "eraser";
eraserBtn.value = "off";
eraserBtn.addEventListener("click", () => {
  toggleEraser();
})
boardcontrolRightDiv.appendChild(eraserBtn);



let changeColorBtn = document.createElement("BUTTON");
changeColorBtn.textContent = "Change Color";
changeColorBtn.id = "changeColor";

changeColorBtn.addEventListener("click", () => {
  if (colorMode == "color palette") {
    selectedColor = prompt("Enter color keyword or hex value: ");
  }
  else if (colorMode == "random color") {
    alert("Invalid color mode!\n To change color, select color mode to \"color palette\"");
  }
});
boardcontrolRightDiv.appendChild(changeColorBtn);


let resetGridBtn = document.createElement("button");
resetGridBtn.textContent = "Reset Grid";
resetGridBtn.id = "resetgrid";
resetGridBtn.addEventListener("click", () => {
  changeGridSize(16);
});
boardcontrolLeftDiv.appendChild(resetGridBtn);



function toggleEraser() {
  if (eraserBtn.value == "off") {
    eraserBtn.value = "on";
    eraserBtn.style.backgroundColor = "gray";
  }
  else {
    eraserBtn.value = "off";
    eraserBtn.style.backgroundColor = "black";
  }
}



function changeGridSize(size) {
  boardDiv.textContent = "";
  if (size < 1 || size > 100) {
    alert("Invalid grid size!\n Grid size must be between 1 and 100");
    size = 16;
  }

  for (let i = 0; i < size; i++) {
    let row = document.createElement("div");
    row.classList = "row";
    for (let j = 0; j < size; j++) {
      const block = document.createElement("div");
      block.classList.add("block", "blockborder");
      row.appendChild(block);
    }
    boardDiv.appendChild(row);
  }
  addPaintListeners();

  gBtn = document.getElementById("toggleGrid");
  gBtn.textContent = "Disable Grid";
  gBtn.style.backgroundColor = "black";
}


function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


function paintBlock(block, color) {
  if (eraserBtn.value == "on") {
    block.style.backgroundColor = "white";
  }
  else {
    block.style.backgroundColor = color;
  }
}


function addPaintListeners() {
  let blockList = document.getElementsByClassName("block");

  for (let i = 0; i < blockList.length; i++) {
    blockList[i].addEventListener("mouseover", () => {
      if (colorMode == "color palette") {
        paintBlock(blockList[i], selectedColor);
      }
      else if (colorMode == "random color") {
        paintBlock(blockList[i], randomColor());
      }
    })
  }
}



function main() {
  changeGridSize(gridSize);
  addPaintListeners();
}
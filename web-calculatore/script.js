const calculatorContainer = document.createElement("div");
calculatorContainer.id = "calc-container";
const calculator = document.createElement("div");
calculator.id = "calculator";


let displayRow = document.createElement("div");
displayRow.classList.add("row");
const display = document.createElement("div");
display.classList.add("display");
displayRow.appendChild(display);
calculator.appendChild(displayRow);

const buttonLabels = [
  ['AC', 'DEL', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
];

const operatorMap = {
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'addition',
  '.': 'decimal',
  '=': 'equal'
}

const numberList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let buttons = [];
let funcBtnList = {};
let operatorBtnList = {};
let numBtnList = {};

for (let i = 0; i < buttonLabels.length; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  for (let j = 0; j < buttonLabels[i].length; j++) {
    let button = document.createElement("button");
    const label = buttonLabels[i][j];
    button.textContent = label;

    if (label in numberList) {
      button.classList.add("number");
      if (label == '0') {
        button.classList.add("zero");
      }
      numBtnList[label] = button;
    }

    else if (label in operatorMap) {
      button.classList.add("operator");
      button.classList.add(operatorMap[label]);
      operatorBtnList[label] = button;
    }

    else {
      button.classList.add("largebutton");
      if (label == 'AC') {
        button.classList.add("clear");
      }
      if (label == 'DEL') {
        button.classList.add("delete");
      }
      funcBtnList[label] = button;
    }

    row.appendChild(button);
  }
  calculator.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
  calculatorContainer.appendChild(calculator);
  document.body.appendChild(calculatorContainer);
});


const clearBtn = funcBtnList["AC"];
const deleteBtn = funcBtnList["DEL"];
const equalBtn = operatorBtnList["="];
const decimalBtn = operatorBtnList["."];

clearBtn.addEventListener("click", () => {
  display.textContent = "";
  decimalBtn.disabled = false;
});

deleteBtn.addEventListener("click", () => {
  if (display.textContent == "Overflow!" || display.textContent == "Infinity" || display.textContent == "Error!") {
    display.textContent = "";
  }
  else if (display.textContent != "") {
    if (display.textContent.slice(-1) == ".") {
      decimalBtn.disabled = false;
    }
    display.textContent = display.textContent.slice(0, -1);
  }
});


for (let btn in numBtnList) {
  numBtnList[btn].addEventListener("click", () => {
    if (display.textContent == "NaN" || display.textContent == "Infinity" || display.textContent == "Error!" || display.textContent == "Overflow!") {
      display.textContent = "Error!";
    }
    else if (display.textContent.length >= 11) {
      display.textContent = "Overflow!";
    }
    else {
      display.textContent += numBtnList[btn].textContent;
    }
  });
}


for (let btn in operatorBtnList) {
  operatorBtnList[btn].addEventListener("click", () => {
    if (display.textContent == "NaN" || display.textContent == "Infinity" || display.textContent == "Error!" || display.textContent == "Overflow!") {
      display.textContent = "Error!";
    }
    else {
      if (operatorBtnList[btn].textContent != "." && operatorBtnList[btn].textContent != "=") {
        display.textContent += operatorBtnList[btn].textContent;
        decimalBtn.disabled = false;
      }
    }
  });
}


decimalBtn.addEventListener("click", () => {
  display.textContent += ".";
  decimalBtn.disabled = true;
});



function operate(num1, num2, operand) {
  switch (operand) {
    case '+':
      return Math.round((num1 + num2) * 1000) / 1000;
    case '-':
      return Math.round((num1 - num2) * 1000) / 1000;
    case '*':
      return Math.round((num1 * num2) * 1000) / 1000;
    case '/':
      return Math.round((num1 / num2) * 1000) / 1000;
  }
}

function checkNumberType(number) {
  if (/^[-+]?\d*\.\d+$/.test(number)) {
    return "float";
  }
  return "int";
}

equalBtn.addEventListener("click", () => {
  let expression = display.textContent;
  if (expression == "NaN" || expression == "Infinity" || expression == "Error!" || expression == "Overflow!") {
    display.textContent = "Error!";
  }

  else if (expression != "") {
    if (/[+\-*/]/.test(expression[0])) {
      expression = "0" + expression;
      console.log(expression);
    }
    let total = 0;
    let expressionNums = [];
    let expressionOprs = [];
    let number = ""

    for (let i = 0; i < expression.length; i++) {
      if (/^[-+]?(\d+(\.\d*)?|\.\d+)$/.test(expression[i]) || expression[i] == ".") {
        number += expression[i];
      }
      else {
        if (checkNumberType(number) == "float") {
          expressionNums.push(parseFloat(number));
        }
        else {
          expressionNums.push(parseInt(number, 10));
        }
        expressionOprs.push(expression[i]);
        number = "";
      }
    }

    if (number != "") {
      if (checkNumberType(number) == "float") {
        expressionNums.push(parseFloat(number));
      }
      else {
        expressionNums.push(parseInt(number, 10));
      }
    }

    for (let i = 0; i < expressionOprs.length; i++) {
      let num1 = expressionNums[0];
      let num2 = expressionNums[1];

      total = operate(num1, num2, expressionOprs[i]);

      expressionNums.shift();
      expressionNums.shift();
      expressionNums.unshift(total);
    }
    display.textContent = `${total}`;
  }

  else {
    display.textContent = "ERROR!"
  }
});


document.addEventListener("keydown", function (event) {
  if (event.key >= '0' && event.key <= '9') {
    display.textContent += event.key;
  }
  else if (event.key == '.' && !decimalBtn.disabled) {
    display.textContent += event.key;
    decimalBtn.disabled = true;
  }
  else if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
    display.textContent += event.key;
    decimalBtn.disabled = false;
  }
  else if (event.key == 'Backspace') {
    deleteBtn.click();
  }
  else if (event.key == '=' || event.key == 'Enter') {
    equalBtn.click();
  }
  else if (event.key == 'Escape') {
    clearBtn.click();
  }
});

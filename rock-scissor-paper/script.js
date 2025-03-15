function getComputerChoice() {
  let choices = ['rock', 'paper', 'scissor'];
  let randomNumber = Math.floor(Math.random() * choices.length);
  return choices[randomNumber];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase();
  computerSelection = computerSelection.toLowerCase();

  if ((playerSelection == 'rock' && computerSelection == 'scissor') ||
    (playerSelection == 'scissor' && computerSelection == 'paper') ||
    (playerSelection == 'paper' && computerSelection == 'rock')) {
    return `You Win! ${playerSelection} beats ${computerSelection}.`
  }

  else if ((playerSelection == 'rock' && computerSelection == 'rock') ||
    (playerSelection == 'paper' && computerSelection == 'paper') ||
    (playerSelection == 'scissor' && computerSelection == 'scissor')) {
    return `Tie! Nobody wins.`
  }

  else {
    return `You Lose! ${computerSelection} beats ${playerSelection}.`
  }
}


let myDiv = document.querySelector('#mainDiv');
let playerChoice;
let opponentChoice;
let result;

let outputDiv = document.createElement('h2');

function createButton(buttonText) {
  let button = document.createElement('BUTTON');
  let text = document.createTextNode(buttonText);
  button.appendChild(text);
  button.style.cssText = "color:white";
  button.style.margin = "20px";
  button.style.padding = "10px";
  button.style.fontSize = "25px";
  button.style.backgroundColor = "black";
  button.id = buttonText;
  button.style.borderRadius = "8px";
  button.style.width = "150px";
  myDiv.appendChild(button);
}

createButton("Rock");
createButton("Paper");
createButton("Scissor");
myDiv.appendChild(outputDiv);

let rockBtn = document.getElementById("Rock");
let paperBtn = document.getElementById("Paper");
let scissorBtn = document.getElementById("Scissor");

rockBtn.addEventListener("click", () => {
  playerChoice = "Rock";
  opponentChoice = getComputerChoice();
  playGame(playerChoice);
})

paperBtn.addEventListener("click", () => {
  playerChoice = "Paper";
  opponentChoice = getComputerChoice();
  playGame(playerChoice);
})

scissorBtn.addEventListener("click", () => {
  playerChoice = "Scissor";
  opponentChoice = getComputerChoice();
  playGame(playerChoice);
})

let playerScore = 0;
let computerScore = 0;
function playGame(player) {
  let roundOutcome = playRound(playerChoice, opponentChoice);

  let outcomeList = roundOutcome.split('!');
  if (outcomeList[0] == "You Win") {
    playerScore++;
  }

  else if (outcomeList[0] == "You Lose") {
    computerScore++;
  }

  result = "\nYour choice: " + playerChoice + "\n\nComputer's choice: " + opponentChoice + '\n\n' + roundOutcome;
  result += "\n\nPlayer Score: " + playerScore + "\nComputer Score: " + computerScore;
  outputDiv.textContent = result;

  if (playerScore == 5 || computerScore == 5) {
    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorBtn.disabled = true;
    if (playerScore > computerScore) {
      outputDiv.textContent += "\n\nPlayer wins!\n";
    }
    else if (playerScore < computerScore) {
      outputDiv.textContent += "\n\nComputer wins!\n";
    }
    else {
      outputDiv.textContent += "Tie Game!\n";
    }

    let resetBtn = document.createElement('BUTTON');
    resetBtn.textContent = "Play Again!"
    resetBtn.style.cssText = "color:white";
    resetBtn.style.margin = "20px";
    resetBtn.style.padding = "10px";
    resetBtn.style.fontSize = "25px";
    resetBtn.style.backgroundColor = "rgb(123,123,160)";
    resetBtn.addEventListener("click", () => {
      window.location.reload();
    });
    outputDiv.appendChild(resetBtn);
  }
}
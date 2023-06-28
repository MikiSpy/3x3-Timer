import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble"
import { generateScramble } from './utils/generateScramble.js'

const text = document.getElementById("scramble");
const timer = document.getElementById("timer");
const solves = document.getElementById("solves");
const avg = document.getElementById("avg");
const avg12 = document.getElementById("avg12");
const clear = document.getElementById("clearButton");
const bestSolve = document.getElementById("bestSolve");
const bestAo5 = document.getElementById("bestAo5");
const bestAo12 = document.getElementById("bestAo12");
const solveInfo = document.getElementById("solveInfo");

let solvesList = [];
let arr = [];
let arrAllAvg5 = [];
let arrAllAvg12 = [];
let arr12 = [];
let solveNumber = 0;
let solveScramble = [];

//___________________________________________________________________________________________

// Define the faces of the cube
const faces = ["U", "D", "L", "R", "F", "B"];

// Define the moves for each face
const moves = {
  U: ["U", "U2", "U'"],
  D: ["D", "D2", "D'"],
  L: ["L", "L2", "L'"],
  R: ["R", "R2", "R'"],
  F: ["F", "F2", "F'"],
  B: ["B", "B2", "B'"],
};

// Generate a random integer between min and max (inclusive)
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Initialize variables
let startTime = null;
let elapsedTime = null;
let timerInterval = null;

clear.addEventListener("click", () => {
  solvesList = [];
  arr = [];
  arr12 = [];
  arrAllAvg5 = [];
  arrAllAvg5 = [];
  avg.textContent = "ao5: -";
  avg12.textContent = "ao12: -";
  timer.textContent = "0.00";
  bestSolve.textContent = "Best solve-";
  bestAo5.textContent = "Best ao5: -";
  bestAo12.textContent = "Best ao12: -";
  solves.textContent = solvesList.join(" ");
})

// Update the timer
function updateTimer() {
  if (startTime) {
    elapsedTime = Date.now() - startTime;
    let time = (timer.textContent = (elapsedTime / 1000).toFixed(2));
  }
}

// Start the timer
function startTimer() {
  if (!startTime) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  }
}

function clickedSolve(){
  solveInfo.style.visibility = 'visible';
}

// Stop the timer
function stopTimer() {
  if (startTime) {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = Date.now() - startTime;
    solvesList.unshift(Number(timer.innerHTML).toFixed(2));
    solveNumber = 1;
    const txt = document.createElement("button");
    txt.setAttribute('name', 'solveTime')
    txt.textContent = document.getElementById("timer").textContent;

   /* const solvesElements = solves.querySelectorAll('solves')
    console.log(solvesElements[0])
    solvesElements.forEach(solve => {
    solve.solveScramble = scramble;
    alert(solve.solveScramble);
    });
    solves.prepend(txt);*/ei tva neshto mu e losho

    const addClickToSolves = () => {
      const anchors = document.getElementsByName("solveTime");
      Array.from(anchors).forEach((anchor) => {
        anchor.addEventListener("click", () => {
          clickedSolve();
        })
      })
    }
    addClickToSolves();
    //trqq da napravim opop up window na vseki solve s tva: https://www.youtube.com/watch?v=AF6vGYIyV8M i hardcodenem s ifvchecker ako veche e otvoren za da bypassnem taq shitnq s nqkolkoto alerta

    startTime = null;
    elapsedTime = null;
    //-------------------------------------------------------------
    //avg5 code:
    

    for (let i = 0; i < 5; i++) {
      arr.unshift(Number(solvesList[i]));
    }
    arr.sort();
    arr.splice(arr[0], 1);
    arr.pop();
    let a = 0;
    for (let i = 0; i < 3; i++) {
      a += arr[i];
    }
    if (solvesList.length >= 5) {
      avg.textContent = `ao5: ${(a / 3).toFixed(2)}`;
      arrAllAvg5.push(Number((a / 3).toFixed(2)));
    }
    //avg12 code--------------------------------------------------------------

    
    for (let i = 0; i < 12; i++) {
      arr12.unshift(Number(solvesList[i]));
    }
    arr12.sort();
    arr12.splice(arr12[0], 1);
    arr12.pop();
    let b = 0;
    for (let i = 0; i < 10; i++) {
      b += arr12[i];
    }
    if (solvesList.length >= 12) {
      avg12.textContent = `ao12: ${(b / 10).toFixed(2)}`;
      arrAllAvg12.push(Number((b / 10).toFixed(2)));
    }

    //bestSolve code---------------------------------
    let arrBestSolve = [...solvesList];
    arrBestSolve.sort();
    let solve = arrBestSolve[0];
    bestSolve.textContent = `Best solve: ${solve}`;
    //bestAvg5 code---------------------------------
    arrAllAvg5.sort();
    if (arrAllAvg5.length >= 1) {
      bestAo5.textContent = `Best ao5: ${Number(arrAllAvg5[0].toFixed(2))}`;
    }
    //bestAvg12 code---------------------------------
    arrAllAvg12.sort();
    if (arrAllAvg12.length >= 1) {
      bestAo12.textContent = `Best ao12: ${Number(arrAllAvg12[0].toFixed(2))}`;
    }
  }
}

// Listen for spacebar keypress
document.addEventListener("keyup", function (event) {
  if (event.code === "Space") {
    if (startTime) {
      stopTimer();
      solveScramble.unshift(scramble);
      text.textContent = generateScramble();
    } else {
      startTimer();
    }
  }
});

clear.addEventListener("click", () => {
  solvesList = [];
  arr = [];
  arr12 = [];
  arrAllAvg5 = [];
  arrAllAvg5 = [];
  avg.textContent = "ao5: -";
  avg12.textContent = "ao12: -";
  timer.textContent = "0.00";
  bestSolve.textContent = "Best solve-";
  bestAo5.textContent = "Best ao5: -";
  bestAo12.textContent = "Best ao12: -";
  solves.textContent = solvesList.join(" ");
}); //wrong

// Update the timer every 10 milliseconds
setInterval(updateTimer, 10);

// Example usage: generate a random Rubik's cube scramble sequence of length 20
text.innerHTML = generateScramble();
timer.textContent = "0.00";

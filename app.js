const holes = document.querySelectorAll(".hole"); //selecting all hols
const scoreBoard = document.querySelector(".score"); //selecting score
const moles = document.querySelectorAll(".mole"); //selecting all moles
const difficultySelected = document.querySelectorAll(".difficulty button");

let score = 0; //to keep track of score
let lastHole; //a variable to keep track of last hole so that mole does not pop from same hole again
let timeUp = false; //initially time up will be false when game is started, a flag
//by default I want game mode to be Easy
let min = 200;
let max = 1000;
/* selecting difficulty */
difficultySelected.forEach((difficulty) => {
  difficulty.addEventListener("click", function () {
    min = difficulty.getAttribute("data-min");
    max = difficulty.getAttribute("data-max");
    randomTime(min, max);
  });
});

/* A function to select random time between specified max and min time*/
function randomTime(min, max) {
  console.log(min, max);
  return Math.round(Math.random() * (max - min) + min);
}

/* A function to select random hole out of the 6 holes we have */
function randomHole(holes) {
  const indX = Math.floor(Math.random() * holes.length); //selecting index between 0 and 5
  const hole = holes[indX]; //storing the index we got in hole variable
  if (hole === lastHole) {
    console.log("same hole");
    return randomHole(holes); //calling the same function again so that it can return a different hole
  }
  lastHole = hole; //storing the last hole as reference so it is not repeated
  return hole;
}

// function to startGame
function startGame() {
  scoreBoard.textContent = 0; //score that is displayed
  timeUp = false; //time up flag
  score = 0; //score in js
  peek();
  //this sets the flag to true after 10s
  setTimeout(() => {
    timeUp = true;
  }, 10000);

  //we want to end game after 10s
}

/* A function responsible for peeking of the mole at random time from random hole*/
function peek() {
  const time = randomTime(min, max);
  const hole = randomHole(holes);
  //   make the mole peek
  hole.classList.add("up");
  //make the mole go back after the time
  setTimeout(() => {
    hole.classList.remove("up");
    // I want to keep the game going as long as time not up
    if (!timeUp) {
      peek();
    }
  }, time);
}

// to check if mole is bonked, this event will occur whenever one
function bonk(e) {
  if (!e.isTrusted) {
    return; //chating
  }
  score++;
  scoreBoard.textContent = score;
  //not a fake click
}
moles.forEach((mole) => {
  mole.addEventListener("click", bonk);
});

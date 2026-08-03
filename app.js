let gameSequence = [];
let userSequence = [];
let btns = ["yellow", "red", "blue", "green"];

let level = 0;
let started = false;

let h2 = document.querySelector("h2");

// =============================GAME START========================

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

// ========================FOR GAME FLASH=====================

function gameFlash(btn) {
    btn.classList.add("game-flash");
    setTimeout(function() {
        btn.classList.remove("game-flash");
    }, 850);
}


// ===========================FOR USER FLASH=========================

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function() {
        btn.classList.remove("user-flash");
    }, 850);
}

// ============================LEVEL UP WITH RANDOM BUTTON========================
function levelUp() {
    userSequence = []; //========LEVELUPKE BAAD USER ARRY KHALI HO JAYEGA HUME START SE VALUE PUSH KARNIHAI
    level++;
    h2.innerText = `Level ${level}`;
    console.log("Level up!");

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSequence.push(randomColor);
    console.log(gameSequence);

    gameFlash(randomBtn);
}

// ===================================USER BUTTON PRESS AND CHECK FUNCTION CALL========================
function btnPress() {
    console.log(this);
    let btn = (this);
    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSequence.push(userColor);
    console.log(userSequence);

    checkAnswer(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".button");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}


// ==============================CHECK ANSWER========================

function checkAnswer(idx) {
    if(userSequence[idx] === gameSequence[idx]) {

        if(userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>. Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "black";
        }, 150);
        reset();
    }

}

// ================================RESET FUNCTION=================================

function reset() {
    started = false;
    level = 0;
    gameSequence = [];
    userSequence = [];
}
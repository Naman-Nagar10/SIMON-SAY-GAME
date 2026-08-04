let gameSequence = [];
let userSequence = [];
let btns = ["yellow", "red", "blue", "green"];

let level = 0;
let started = false;

let h2 = document.querySelector("h2");

// ============================= GAME START ============================

function startGame() {
    if (started) return;

    started = true;
    levelUp();
}

document.addEventListener("keydown", startGame);
document.addEventListener("pointerdown", startGame);

// ============================= GAME FLASH ============================

function gameFlash(btn) {
    btn.classList.add("game-flash");

    setTimeout(() => {
        btn.classList.remove("game-flash");
    }, 250);
}

// ============================= USER FLASH ============================

function userFlash(btn) {
    btn.classList.add("user-flash");

    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 250);
}

// ============================= LEVEL UP ============================

function levelUp() {
    userSequence = [];
    level++;

    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * btns.length);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameSequence.push(randomColor);

    console.log("Game Sequence:", gameSequence);

    gameFlash(randomBtn);
}

// ============================= BUTTON PRESS ============================

function btnPress() {
    if (!started) return;

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSequence.push(userColor);

    console.log("User Sequence:", userSequence);

    checkAnswer(userSequence.length - 1);
}

let allBtns = document.querySelectorAll(".button");

allBtns.forEach((btn) => {
    btn.addEventListener("pointerdown", btnPress);
});

// ============================= CHECK ANSWER ============================

function checkAnswer(idx) {

    if (userSequence[idx] === gameSequence[idx]) {

        if (userSequence.length === gameSequence.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>.<br>Press any key or tap to restart`;

        document.body.style.backgroundColor = "red";

        setTimeout(() => {
            document.body.style.backgroundColor = "black";
            reset();
        }, 300);
    }
}

// ============================= RESET ============================

function reset() {
    started = false;
    level = 0;
    gameSequence = [];
    userSequence = [];
}

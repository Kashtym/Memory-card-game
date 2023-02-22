import { pictures } from "./data.js";
import { stopTimer, timerForDisplay } from "./timer.js";

const cards = document.querySelector(".cards");
let openCard1, openCard2;
let counter = 0;
let result = {};

// shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// create card with background image
function createCard(url, cardNum) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.dataset.cardNum = cardNum;
    card.innerHTML = `
    <div class="card__front "></div>
    <div class="card__back"></div>
   `;
    card.children[0].style.background = `white url(.${url})  no-repeat center /contain`;
    card.addEventListener("click", checkCard);
    return card;
}

//add cards in random position
function addCards() {
    cards.innerHTML = "";
    const cardsArr = [];
    //create array with cards
    for (let i = 0; i < pictures.length; i++) {
        cardsArr.push(createCard(pictures[i], i));
        cardsArr.push(createCard(pictures[i], i));
    }

    shuffleArray(cardsArr);
    cardsArr.forEach((elem) => cards.appendChild(elem));
}

//
function checkCard() {
    //setResult();
    //showResult();
    if (!openCard2) {
        this.classList.add("card__flip");
        if (!openCard1) {
            openCard1 = this;
        } else {
            openCard2 = this;
            counter++;
            showScore();
            if (openCard1.dataset.cardNum !== openCard2.dataset.cardNum) {
                setTimeout(function () {
                    openCard1.classList.remove("card__flip");
                    openCard2.classList.remove("card__flip");
                    openCard1 = "";
                    openCard2 = "";
                }, 1000);
            } else {
                openCard1.removeEventListener("click", checkCard);
                openCard2.removeEventListener("click", checkCard);
                openCard1 = "";
                openCard2 = "";
            }
            if (checkEndGame()) {
                stopTimer();
                setResult();
            }
        }
    }
}

function checkEndGame() {
    // if all cards has class "card__flip"
    if (
        [...cards.children].every((elem) =>
            [...elem.classList].includes("card__flip")
        )
    ) {
        return true;
    } else {
        return false;
    }
}

const score = document.querySelector("#score");
function showScore() {
    score.textContent = counter;
}

function restartScore() {
    counter = 0;
    score.textContent = counter;
}

function setResult() {
    result.name = document.querySelector("#nickname").value;
    result.date = new Date();
    result.score = counter;
    const time = timerForDisplay();
    result.time = `${time.minutes}:${time.seconds}:${time.milliseconds}`;
    console.dir(result);
}

function showResult() {
    const gameResult = document.querySelector("#game-result");
    gameResult.classList.remove("none");
    const gameResultArea = gameResult.querySelector("#game-result ul li p");
    gameResultArea.textContent = `Date:${createDate(result.date)} Nickname:${
        result.name
    } Score:${result.score} Time:${result.time}`;
}

function createDate(date) {
    return `${date.getDate().toString().padStart(2, 0)}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}.${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}`;
}

export { addCards, restartScore };

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
    card.children[0].style.background = `white url(${url}) no-repeat center / contain`;
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

    removeResult();
}

//game logic
function checkCard() {
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
                setResult();
                stopTimer();
                showResult();
                saveResult(result);
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

// show and reset score
const score = document.querySelector("#score");
function showScore() {
    score.textContent = counter;
}

function restartScore() {
    counter = 0;
    score.textContent = counter;
}

// results

function setResult() {
    result.name = document.querySelector("#nickname").value;
    result.date = createDate(new Date());
    result.score = counter;
    const time = timerForDisplay();
    result.time = `${time.minutes}:${time.seconds}:${time.milliseconds}`;
}

function showResult() {
    const gameResult = document.querySelector("#game-result");
    gameResult.classList.remove("none");
    const gameResultArea = gameResult.querySelector("#game-result ul li p");
    gameResultArea.textContent = resultTostring(result);
}

function resultTostring(res) {
    return `Date:${res.date} Nickname:${res.name} Score:${res.score} Time:${res.time}`;
}

function removeResult() {
    const gameResult = document.querySelector("#game-result");
    gameResult.classList.add("none");
}

//create string date in format "DD.MM.YYYY HH:MM" from date object
function createDate(date) {
    return `${date.getDate().toString().padStart(2, 0)}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, 0)}.${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}`;
}

// results in local storage

function saveResult(res) {
    if (!localStorage.memCardGameData) {
        localStorage.memCardGameData = JSON.stringify([]);
    }
    const memCardGameDataArr = JSON.parse(localStorage.memCardGameData);
    memCardGameDataArr.push(res);
    localStorage.memCardGameData = JSON.stringify(memCardGameDataArr);
}

function showBestResults() {
    if (localStorage.memCardGameData) {
        const memCardGameDataArr = JSON.parse(localStorage.memCardGameData);

        let minScore, minTime;

        if (memCardGameDataArr.length > 0) {
            //min score
            minScore = memCardGameDataArr[0];
            memCardGameDataArr.forEach((el) => {
                if (parseFloat(el.score) < parseFloat(minScore.score)) {
                    minScore = el;
                }
            });
            document.querySelector("#best-score").textContent =
                resultTostring(minScore);

            //min time
            minTime = memCardGameDataArr[0];
            memCardGameDataArr.forEach((el) => {
                if (el.time < minTime.time) {
                    minTime = el;
                }
            });
            document.querySelector("#best-time").textContent =
                resultTostring(minTime);
        }
    }
}

export { addCards, restartScore, showBestResults };

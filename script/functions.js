import { pictures } from "./data.js";
import { stopTimer } from "./timer.js";

const cards = document.querySelector(".cards");
let openCard1, openCard2;
let counter = 0;

// shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// create card with image url
function createCard(url) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
<div class="card__front">
    <img src="${url}" alt="" />
</div>
<div class="card__back">Click me</div>
   `;
    card.addEventListener("click", checkCard);
    return card;
}

//add cards in random position
function addCards() {
    cards.innerHTML = "";
    const cardsArr = [];
    //create array with cards
    for (let i = 0; i < pictures.length; i++) {
        cardsArr.push(createCard(pictures[i]));
        cardsArr.push(createCard(pictures[i]));
    }

    shuffleArray(cardsArr);
    cardsArr.forEach((elem) => cards.appendChild(elem));
}

//
function checkCard() {
    if (!openCard2) {
        this.classList.add("card__flip");
        if (!openCard1) {
            openCard1 = this;
        } else {
            openCard2 = this;
            counter++;
            showCounter();
            if (
                openCard1.children[0].children[0].src !==
                openCard2.children[0].children[0].src
            ) {
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

const counterText = document.querySelector(".result__counter > span");
function showCounter() {
    counterText.textContent = counter;
}

function restarCounter() {
    counter = 0;
    counterText.textContent = counter;
}

export { addCards, restarCounter };

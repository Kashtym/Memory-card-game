import { addCards, restarCounter } from "./functions.js";
import { startTimer } from "./timer.js";

const startButton = document.querySelector(".start-button");

startButton.addEventListener("click", addCards);
startButton.addEventListener("click", startTimer);
startButton.addEventListener("click", restarCounter);

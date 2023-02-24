import {
    addCards,
    restartScore,
    showBestResults,
    goToPage,
} from "./functions.js";
import { startTimer, stopTimer } from "./timer.js";

//pages array
const pages = [];

//buttons array
const buttons = [];

//find menu page elements
const menuPage = document.querySelector("#menu");
pages.push(menuPage);
const btnResult = menuPage.querySelector("#btn-result");
const btnStart = menuPage.querySelector("#btn-start");
buttons.push(btnResult, btnStart);

//find game page elements
const gamePage = document.querySelector("#game");
pages.push(gamePage);
const btnRestart = gamePage.querySelector("#btn-restart");
const btnGameQuit = gamePage.querySelector("#btn-game-quit");
buttons.push(btnRestart, btnGameQuit);

//find timer elevents
export const timerMinutes = gamePage.querySelector("#minutes");
export const timerSeconds = gamePage.querySelector("#seconds");
export const timerMilliseconds = gamePage.querySelector("#milliseconds");

//find results page elements
const resultsPage = document.querySelector("#results");
pages.push(resultsPage);
const btnQuit = resultsPage.querySelector("#btn-quit");
buttons.push(btnQuit);

//page navigation
buttons.forEach((el) => {
    el.addEventListener("click", goToPage);
});

//start stop timer
btnStart.addEventListener("click", startTimer);
btnRestart.addEventListener("click", startTimer);
btnGameQuit.addEventListener("click", stopTimer);

//start restart game
btnStart.addEventListener("click", addCards);
btnRestart.addEventListener("click", addCards);
btnStart.addEventListener("click", restartScore);
btnRestart.addEventListener("click", restartScore);

//show best results
btnResult.addEventListener("click", showBestResults);

export { pages };

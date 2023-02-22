import { timerMinutes, timerSeconds, timerMilliseconds } from "./index.js";

//timer

let timer = 0;
let flag = false,
    intervalHandler;

//add timer counter and add value to display in format MM:SS:mSmS
const countAndSetTime = () => {
    timer++;
    let { minutes, seconds, milliseconds } = timerForDisplay();

    timerMilliseconds.textContent = milliseconds;
    timerSeconds.textContent = seconds;
    timerMinutes.textContent = minutes;
};

//timer for display
function timerForDisplay() {
    const timeObj = {};
    timeObj.minutes = (Math.floor(timer / 100 / 60) % 60)
        .toString()
        .padStart(2, 0);
    timeObj.seconds = (Math.floor(timer / 100) % 60).toString().padStart(2, 0);
    timeObj.milliseconds = (timer % 100).toString().padStart(2, 0);
    return timeObj;
}

//start timer
function startTimer() {
    if (!flag) {
        intervalHandler = setInterval(countAndSetTime, 10);
        flag = true;
    } else {
        clearInterval(intervalHandler);
        timer = 0;
        intervalHandler = setInterval(countAndSetTime, 10);
    }
}

// stop and clear timer
function stopTimer() {
    clearInterval(intervalHandler);
    flag = false;
    timer = 0;
}

export { startTimer, stopTimer, timerForDisplay };

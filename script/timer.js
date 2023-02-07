//timer

let timer = 0;
let flag = false,
    intervalHandler;

//check display
const display = document.querySelector(".result__timer");
let [...displayArr] = display.children;

//add timer counter and add value to display in format MM:SS:mSmS
const countAndSetTime = () => {
    timer++;
    displayArr[2].textContent = (timer % 100).toString().padStart(2, 0);
    displayArr[1].textContent = (Math.floor(timer / 100) % 60)
        .toString()
        .padStart(2, 0);
    displayArr[0].textContent = (Math.floor(timer / 100 / 60) % 60)
        .toString()
        .padStart(2, 0);
};

//start timer
function startTimer() {
    if (!flag) {
        intervalHandler = setInterval(countAndSetTime, 10);
        flag = true;
    }
}

// stop and clear timer
function stopTimer() {
    clearInterval(intervalHandler);
    flag = false;
    timer = 0;
}

export { startTimer, stopTimer };

const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('workTime');
const restTimeInput = document.getElementById('restTime');

let workTime = "25:00";

function parseTime(timeString) {
    const parts = timeString.split(":");
    const numParts = parts.length;

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (numParts === 3) {
        hours = parseInt(parts[0], 10);
        minutes = parseInt(parts[1], 10);
        seconds = parseInt(parts[2], 10);
    } else if (numParts === 2) {
        minutes = parseInt(parts[0], 10);
        seconds = parseInt(parts[1], 10);
    } else if (numParts === 1) {
        seconds = parseInt(parts[0], 10);
    }

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function startTimer() {

}

// Displaying the timer dynamically
function initTimer() {
    let { hours, minutes, seconds } = parseTime(workTime);

    hh = hours == 0 ? '' : hours + ":";
    mm = minutes == 0 ? '' : minutes + ":";
    ss = seconds < 10 ? "0"+seconds : seconds;

    timeDisplay.innerHTML = hh + mm + ss;
}

initTimer();
const sessionDisplay = document.getElementById('session');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const workTimeInput = document.getElementById('workTime');
const restTimeInput = document.getElementById('restTime');

// var workTime = 2;     // minutes
// var wTime = workTime * 60;    // seconds
var wTime = 10; // seconds

// var restTime = 1; // minutes
// var rTime = restTime *  60;
var rTime = 10; // minutes

const speed = 100;
let isRunning = false;
let isWorking = true;   // by default
let time = wTime;
let x;

// * Timer Functions
function startTimer() {

    isRunning = !isRunning;

    if (isRunning) {
        console.log("test");
        x = setInterval(function () {
            time--;

            if (time >= 0) {
                initTimer(time);
            } else {
                if (isWorking) {
                    // Switch to rest time
                    console.log("Switching to rest time");
                    isWorking = false;
                    time = rTime;
                    sessionDisplay.innerHTML = "Resting";
                    initTimer(time);
                } else {
                    // Switch to work time
                    console.log("Switching to work time");
                    isWorking = true;
                    time = wTime;
                    sessionDisplay.innerHTML = "Working";
                    initTimer(time);
                }

                // Check if certain number of loops have occured, then
                // clearInterval(x);
            }
        }, speed);
    }
    else {
        console.log("pause");
        startButton.innerText = "Resume";
        clearInterval(x);
        isWorking = false;
    }
}

function resetTimer()  {
    sessionDisplay.innerHTML = "Working";
    startButton.innerText = "Start";

    clearInterval(x);
    isWorking = false;
    initTimer(wTime);
}

// Displaying the timer dynamically
function initTimer(t) {
    const hours = Math.floor((t / 60) / 60);
    const minutes = Math.floor((t / 60) % 60);
    const seconds = t % 60;

    const hh = hours == 0 ? '' : hours + ":";
    const mm = minutes < 10 ? "0" + minutes + ":" : minutes + ":";
    const ss = seconds < 10 ? "0"+seconds : seconds;

    timeDisplay.innerHTML = hh + mm + ss;
}

// * Inputs
workTimeInput.addEventListener('blur', function () {
    workTime = parseInt(workTimeInput.value, 10);
    initTimer();
});

workTimeInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        workTime = parseInt(workTimeInput.value, 10);
        workTimeInput.blur();
        initTimer();
    }
});

initTimer(wTime);
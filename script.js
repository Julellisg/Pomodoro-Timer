// Timer div
const sessionDisplay = document.getElementById('session');
const timeDisplay = document.getElementById('time');
// Controls div
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
// Settings div
const workTimeInput = document.getElementById('workTime');
const restTimeInput = document.getElementById('restTime');
const setCountInput = document.getElementById('setCount');

// No values
var w = 0;  // MINUTES
var workTime = 0; // MINUTES
var r = 0;  // MINUTES
var restTime = 0; // MINUTES
var time = 0;   // SECONDS

var s = 0;
var set = 0;

const speed = 10;
var paused = true;
var isWorking = true;

let intervalId;

// Takes time in SECONDS
function startTimer() {
    if (time > 0) {
        paused = !paused; // Toggle the paused state

        if (!paused) {
            intervalId = setInterval(function () {
                time--;
                updateTimerDisplay(time);

                // ! ALTERNATE BETWEEN WORKING AND RESTING
                if (time <= 0) {
                    paused = true;
                    clearInterval(intervalId); // Clear the interval when time reaches 0
                    // ! Switching to RESTING
                    if(isWorking) {
                        isWorking = false;
                        sessionDisplay.innerHTML = "Resting";
                        time = restTime;
                        startTimer();
                    } 
                    // ! Switching to WORKING
                    else {
                        isWorking = true;
                        sessionDisplay.innerHTML = "Working";
                        time = workTime;
                        startTimer();

                        // increment sets
                        if (set > 0) {
                            s++;
                            if(s == set) {
                                clearInterval(intervalId); // Stop the interval after the specified number of sets
                                s = 0;
                                sessionDisplay.innerHTML = "Done!"
                                startButton.disabled = true; // Disable the button during countdown
                                setTimeout(resetTimer, 3500);
                            }
                        } else {
                            startTimer(); // Start the timer for the next set
                        }
                    }
                }
            }, speed); // Change interval to 1000 milliseconds (1 second)
        } else {
            clearInterval(intervalId);
        }

        // Toggle button text between "Resume" and "Pause"
        startButton.textContent = paused ? "Resume" : "Pause";
    }
}

// ! MAKE SURE LABELS ARE RESET AS WELL
function resetTimer() {
    clearInterval(intervalId);
    paused = true;
    isWorking = true;
    s = 0;
    sessionDisplay.innerHTML = "Working";
    time = workTime;
    updateTimerDisplay(time);
    startButton.disabled = false; // Disable the button during countdown
    startButton.textContent = "Start";
}

function updateTimerDisplay(time) {
    const hours = Math.floor((time / 60) / 60);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = time % 60;

    const hh = hours == 0 ? '' : hours + ":";
    const mm = minutes < 10 ? "0" + minutes + ":" : minutes + ":";
    const ss = seconds < 10 ? "0" + seconds : seconds;

    timeDisplay.innerHTML = hh + mm + ss;
}

// * Inputs
workTimeInput.addEventListener('blur', function () {
    w = parseInt(workTimeInput.value, 10);
    updateTimerDisplay(workTime);
});

workTimeInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        w = parseInt(workTimeInput.value, 10)  *  60;
        workTimeInput.blur();
        updateTimerDisplay(workTime);
    }
});

restTimeInput.addEventListener('blur', function () {
    r = parseInt(restTimeInput.value, 10)
    updateTimerDisplay(restTime);
});

restTimeInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        r = parseInt(restTimeInput.value, 10);
        restTimeInput.blur();
        updateTimerDisplay(restTime);
    }
});

function init() {
    // Set up the timer for when the user first loads up the page:
    w = parseInt(workTimeInput.value, 10);
    r = parseInt(restTimeInput.value, 10);
    set = parseInt(setCountInput.value, 10);
    workTime = w * 60;
    restTime = r * 60;
    time = workTime;
    updateTimerDisplay(time);
}

init();
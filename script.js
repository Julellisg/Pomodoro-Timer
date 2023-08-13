// Timer div
const sessionDisplay = document.getElementById('session');
const progressDisplay = document.getElementById('progress');
const timeDisplay = document.getElementById('time');
// Controls div
const startButton = document.getElementById('start');
const skipButton = document.getElementById('skip');
const resetButton = document.getElementById('reset');
// Settings div
const workTimeInput = document.getElementById('workTime');
const restTimeInput = document.getElementById('restTime');
const setCountInput = document.getElementById('setCount');
// More options / Accesibility div
const acc = document.getElementsByClassName("accordion");
const option1Checkbox = document.querySelector('input[name="option1"]');
const sound1 = document.getElementById('sound1');

var i;

// Time Calculation variables
var w = 0;  // MINUTES
var workTime = 0; // MINUTES
var r = 0;  // MINUTES
var restTime = 0; // MINUTES
var time = 0;   // SECONDS

var s = 0;
var set = 0;

const speed = 1000;
var paused = true;
var isWorking = true;

let intervalId;

function updateProgressDisplay() {
    if (s <= set && set != 0) {
        progressDisplay.innerHTML = "[" + (s + 1) + "/" + set + "]";
    } else {
        progressDisplay.innerHTML = "[&infin;]";
    }
}

// Takes time in SECONDS
function startTimer() {
    if (time > 0) {
        paused = !paused; // Toggle the paused state

        if (!paused) {
            workTimeInput.disabled = true;
            restTimeInput.disabled = true;
            setCountInput.disabled = true;

            updateProgressDisplay();

            // ! Interval
            intervalId = setInterval(function () {
                time--;
                updateTimerDisplay(time);

                // ! ALTERNATE BETWEEN WORKING AND RESTING
                if (time <= 0) {
                    paused = true;
                    clearInterval(intervalId); // Clear the interval when time reaches 0

                    // ! Switching to RESTING
                    if (isWorking) {
                        if (option1Checkbox.checked) playSFX();
                        isWorking = false;
                        sessionDisplay.innerHTML = "Resting";
                        time = restTime;
                        startTimer();
                    }
                    // ! Switching to WORKING
                    else {
                        if (option1Checkbox.checked) playSFX();
                        isWorking = true;
                        sessionDisplay.innerHTML = "Working";
                        time = workTime;
                        startTimer();

                        // increment sets
                        if (set > 0) {
                            s++;
                            updateProgressDisplay();
                            if (s == set) {
                                if (option1Checkbox.checked) playSFX();
                                clearInterval(intervalId); // Stop the interval after the specified number of sets
                                s = 0;
                                sessionDisplay.innerHTML = "Done!"
                                progressDisplay.innerHTML = "";
                                startButton.disabled = true; // Disable the button during countdown
                                skipButton.disabled = true;
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

function skipTimer() {
    paused = true;
    clearInterval(intervalId);

    workTimeInput.disabled = true;
    restTimeInput.disabled = true;
    setCountInput.disabled = true;

    // ! Switching to RESTING
    if (isWorking) {
        if (option1Checkbox.checked) playSFX();
        isWorking = false;
        sessionDisplay.innerHTML = "Resting";
        time = restTime;
        // startTimer();
    }
    // ! Switching to WORKING
    else {
        if (option1Checkbox.checked) playSFX();
        isWorking = true;
        sessionDisplay.innerHTML = "Working";
        time = workTime;
        // startTimer();

        // increment sets
        if (set > 0) {
            s++;
            updateProgressDisplay();
            if (s == set) {
                if (option1Checkbox.checked) playSFX();
                clearInterval(intervalId); // Stop the interval after the specified number of sets
                s = 0;
                sessionDisplay.innerHTML = "Done!"
                progressDisplay.innerHTML = "";
                startButton.disabled = true; // Disable the button during countdown
                skipButton.disabled = true;
                setTimeout(resetTimer, 3500);
            }
        } else {
            startTimer(); // Start the timer for the next set
        }
    }

    updateTimerDisplay(time);
    startButton.textContent = "Resume";
}

function resetTimer() {
    clearInterval(intervalId);
    paused = true;
    isWorking = true;

    s = 0;
    updateProgressDisplay();
    sessionDisplay.innerHTML = "Working";
    time = workTime;
    updateTimerDisplay(time);

    startButton.disabled = false; // Disable the button during countdown
    skipButton.disabled = false; // Disable the button during countdown

    workTimeInput.disabled = false;
    restTimeInput.disabled = false;
    setCountInput.disabled = false;

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
    workTime = parseInt(workTimeInput.value, 10) * 60;
    updateTimerDisplay(workTime);
});

workTimeInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        workTime = parseInt(workTimeInput.value, 10) * 60;
        workTimeInput.blur();
        updateTimerDisplay(workTime);
    }
});

restTimeInput.addEventListener('blur', function () {
    restTime = parseInt(restTimeInput.value, 10) * 60;
});

restTimeInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        r = parseInt(restTimeInput.value, 10) * 60;
        restTimeInput.blur();
    }
});

setCountInput.addEventListener('blur', function () {
    set = parseInt(setCountInput.value, 10);
    updateProgressDisplay();
});

setCountInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        set = parseInt(setCountInput.value, 10);
        setCountInput.blur();
        updateProgressDisplay();
    }
});

function playSFX() {
    sound1.currentTime = 0;
    sound1.play();

    sound1.addEventListener('ended', function () {
        sound1.pause();
    });
}

function toggleSound(soundId, checked) {
    const sound = document.getElementById(soundId);
    if (checked) {
        sound.currentTime = 5;
        sound.play();
    } else {
        sound.pause();
        sound.currentTime = 5;
    }
}

function adjustVolumeForAll() {
    const soundIds = ['sound1', 'sound2', 'sound3', 'sound4', 'sound5'];
    const volumeIds = ['range1', 'range2', 'range3', 'range4', 'range5'];

    for (let i = 0; i < soundIds.length; i++) {
        const volumeElement = document.getElementsByName(volumeIds[i])[0]; // Get the input range element
        const volume = volumeElement.value; // Get the value of the input range element
        adjustVolume(soundIds[i], volume);
    }
}

function adjustVolume(soundId, volume) {
    const sound = document.getElementById(soundId);
    sound.volume = parseFloat(volume);
}

function applyColorTheme(themeName) {
    const selectedTheme = themesData[themeName];
    if (selectedTheme) {
        document.body.style.backgroundColor = selectedTheme.background;
        document.body.style.color = selectedTheme.text;

        const mainContent = document.getElementById('main-content');
        mainContent.style.border = `2px solid ${selectedTheme.border}`;

        // ! Buttons
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.style.color = selectedTheme.text;
            button.style.border = `2px solid ${selectedTheme.text}`;
            button.style.backgroundColor = selectedTheme.background;

            // Hovering over
            button.addEventListener('mouseover', () => {
                button.style.color = selectedTheme.hover;
                button.style.border = `2px solid ${selectedTheme.hover}`;
            });

            // Restore after hovering
            button.addEventListener('mouseout', () => {
                button.style.color = selectedTheme.text;
                button.style.border = `2px solid ${selectedTheme.text}`;
            });

            // 
            button.addEventListener('mousedown', () => {
                button.style.color = selectedTheme.text;
                button.style.border = `2px solid ${selectedTheme.text}`;
            });

            button.addEventListener('mouseup', () => {
                button.style.color = selectedTheme.hover;
                button.style.border = `2px solid ${selectedTheme.hover}`;
            });
        });

        // ! Active button
        const activeElements = document.querySelectorAll('.active');
        activeElements.forEach(element => {
            activeElements.style.color = selectedTheme.hover;
            activeElements.style.border = `2px solid ${selectedTheme.hover}`;
        });
    }
}

function init() {
    // Set up the timer for when the user first loads up the page:
    w = parseInt(workTimeInput.value, 10);
    r = parseInt(restTimeInput.value, 10);
    set = parseInt(setCountInput.value, 10);
    updateProgressDisplay()
    workTime = w * 60;
    restTime = r * 60;
    time = workTime;
    updateTimerDisplay(time);

    // Set up accordion
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    // Set up audio
    adjustVolumeForAll()

    // Fetch themes.json once when the page loads
    fetch('themes.json')
        .then(response => response.json())
        .then(data => {
            themesData = data;
        })
        .catch(error => console.error('Error loading themes:', error));
}

init();
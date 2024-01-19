let startTime;
let isRunning = false;
let lapCounter = 1;
let intervalId; // Variable to store the interval ID

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        isRunning = true;
        updateDisplay();
        intervalId = setInterval(updateDisplay, 1000);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId); // Clear the interval
    }
}

function resetStopwatch() {
    isRunning = false;
    startTime = 0;
    lapCounter = 1;
    updateDisplay();
    document.getElementById("laps").innerHTML = "";
    clearInterval(intervalId); // Clear the interval
}

function recordLap() {
    if (isRunning) {
        const lapTime = calculateTimeElapsed(startTime);
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById("laps").appendChild(lapItem);
        lapCounter++;
    }
}

function calculateTimeElapsed(startTime) {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    return formatTime(elapsedTime);
}

function formatTime(time) {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}

function updateDisplay() {
    const currentTime = isRunning ? calculateTimeElapsed(startTime) : "00:00:00";
    document.getElementById("display").innerText = currentTime;
}

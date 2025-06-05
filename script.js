let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;
let spinCount = 0;
let totalDuration = 0;
const statusElement = document.getElementById('status');
const spinTableBody = document.getElementById('spinTableBody');
const totalDurationElement = document.getElementById('totalDuration');

function formatTime(ms) {
    let hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
    let minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    let seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    let tenths = Math.floor((ms % 1000) / 100).toString();
    return `${hours}:${minutes}:${seconds}<span class="decisecond">.${tenths}</span>`;
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    document.getElementById('timer').innerHTML = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 100);
        isRunning = true;
        statusElement.textContent = 'Running';
        statusElement.className = 'status-running';
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        statusElement.textContent = 'Paused';
        statusElement.className = 'status-paused';
    }
}

function completeTimer() {
    if (elapsedTime > 0) {
        spinCount++;
        totalDuration += elapsedTime;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${spinCount}</td>
            <td>${formatTime(elapsedTime)}</td>
        `;
        spinTableBody.appendChild(row);
        totalDurationElement.innerHTML = formatTime(totalDuration);
    }
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('timer').innerHTML = formatTime(0);
    statusElement.textContent = 'Not Started';
    statusElement.className = 'status-not-started';
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        event.preventDefault();
        isRunning ? pauseTimer() : startTimer();
    } else if (event.code === 'Enter') {
        event.preventDefault();
        completeTimer();
    }
});

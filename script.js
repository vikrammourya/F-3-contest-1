const activeTimersContainer = document.getElementById('activeTimers');
const startTimerButton = document.getElementById('startTimer');
const noTimersMessage = document.getElementById('noTimersMessage');

// Event listener for clicking the 'Start Timer' button
startTimerButton.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds === 0) {
        alert('Please enter a valid time!!!');
        return;
    }

    createTimer(totalSeconds);
});

function createTimer(totalSeconds) {
    const timerElement = document.createElement('div');
    timerElement.classList.add("timer");

    activeTimersContainer.appendChild(timerElement);

    const timeLeftText = document.createElement('span');
    timeLeftText.textContent = 'Time Left:';
    timerElement.appendChild(timeLeftText);

    const timeDisplay = document.createElement('span');
    timerElement.appendChild(timeDisplay);

    let countdownInterval = setInterval(() => {
        totalSeconds--;

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            timerElement.className = 'timer timer-end';
            timerElement.innerHTML = 'Time\'s up! ';
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Timer';
            deleteButton.addEventListener('click', () => {
                clearInterval(countdownInterval);
                timerElement.remove();
                checkTimers(); // Check if there are any active timers left
            });
            timerElement.appendChild(deleteButton);
            playAudioAlert();
        } else {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timerElement.textContent = `Time Left: ${formattedTime}`;

            const stopButton = document.createElement('button');
            stopButton.innerText = 'Stop Timer';
            stopButton.addEventListener('click', () => {
                clearInterval(countdownInterval);
                timerElement.remove();
                checkTimers(); // Check if there are any active timers left
            });
            timerElement.appendChild(stopButton);
        }
    }, 1000);
    
    // Function to play the audio alert
    function playAudioAlert() {
        const audio = new Audio('alert.mp3');
        audio.play();
    }

     
    // Function to check if there are any active timers left
    function checkTimers() {
        const timers = document.querySelectorAll('.timer');
        if (timers.length === 0) {
            noTimersMessage.style.display = 'block'; // Show the message
        } else {
            noTimersMessage.style.display = 'none'; // Hide the message
        }
    }
}

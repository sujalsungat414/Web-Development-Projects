(() => {
  // Get DOM elements
  const minutesInput = document.getElementById("minutes");
  const secondsInput = document.getElementById("seconds");
  const timeDisplay = document.getElementById("timeDisplay");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");

  let totalSeconds = 60; // Total countdown time in seconds
  let intervalId = null; // ID of the interval for the timer
  let remainingSeconds = totalSeconds; // Remaining seconds for the countdown
  let isRunning = false; // Timer running state

  // Format seconds as MM:SS string
  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  // Update display based on remainingSeconds
  function updateDisplay() {
    timeDisplay.textContent = formatTime(remainingSeconds);
  }

  // Start timer
  function startTimer() {
    if (isRunning) return; // Prevent starting if already running

    // Validate inputs on start only
    const mins = parseInt(minutesInput.value, 10);
    const secs = parseInt(secondsInput.value, 10);

    // Check for valid input values
    if (
      isNaN(mins) ||
      isNaN(secs) ||
      mins < 0 ||
      secs < 0 ||
      secs > 59 ||
      (mins === 0 && secs === 0)
    ) {
      alert(
        "Please enter a valid time greater than 0 minutes or seconds (seconds must be 0-59)."
      );
      return;
    }

    totalSeconds = mins * 60 + secs; // Calculate total seconds
    remainingSeconds = totalSeconds; // Set remaining seconds
    updateDisplay(); // Update display

    // Start countdown interval
    intervalId = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--; // Decrease remaining seconds
        updateDisplay(); // Update display
      } else {
        clearInterval(intervalId); // Stop the interval
        intervalId = null;
        isRunning = false; // Update running state
        updateButtons(); // Update button states
        alert("Time's up!"); // Alert when time is up
      }
    }, 1000);

    isRunning = true; // Set running state
    updateButtons(); // Update button states
    // Disable inputs while running
    minutesInput.disabled = true;
    secondsInput.disabled = true;
  }

  // Pause timer
  function pauseTimer() {
    if (!isRunning) return; // Prevent pausing if not running

    clearInterval(intervalId); // Stop the interval
    intervalId = null;
    isRunning = false; // Update running state
    updateButtons(); // Update button states
  }

  // Reset timer
  function resetTimer() {
    clearInterval(intervalId); // Stop the interval
    intervalId = null;
    isRunning = false; // Update running state
    remainingSeconds = totalSeconds; // Reset remaining seconds
    updateDisplay(); // Update display
    updateButtons(); // Update button states
    minutesInput.disabled = false; // Enable inputs
    secondsInput.disabled = false;
  }

  // Update buttons state based on timer state
  function updateButtons() {
    startBtn.disabled = isRunning; // Disable start button if running
    pauseBtn.disabled = !isRunning; // Disable pause button if not running
    resetBtn.disabled = remainingSeconds === totalSeconds && !isRunning; // Disable reset if timer is at initial state
  }

  // Event listeners for button clicks
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);

  // Initialize display and button states
  updateDisplay();
  updateButtons();
})();

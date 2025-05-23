function updateClock() {
  // Get the clock element from the DOM
  const clock = document.getElementById("clock");

  // Create a new Date object to get the current time
  const now = new Date();

  // Extract hours, minutes, and seconds from the current time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Format hours, minutes, and seconds to always have 2 digits
  hours = hours < 10 ? "0" + hours : hours; // Add leading zero if hours < 10
  minutes = minutes < 10 ? "0" + minutes : minutes; // Add leading zero if minutes < 10
  seconds = seconds < 10 ? "0" + seconds : seconds; // Add leading zero if seconds < 10

  // Update the text content of the clock element with the formatted time
  clock.textContent = hours + ":" + minutes + ":" + seconds;
}

// Set an interval to update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Call updateClock initially to avoid delay in displaying the time
updateClock();

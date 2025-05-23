// Initialize calculation from local storage or set to an empty string
let calculation = localStorage.getItem("calculation") || "";

// Display the current calculation
showCalculation();

/**
 * Function to display the current calculation on the screen
 */
function showCalculation() {
  document.querySelector(".js-show-calculation").innerHTML = calculation;
}

/**
 * Function to update the calculation string with the given value
 * @param {string} value - The value to add to the calculation
 */
function updateCalculation(value) {
  calculation += value;
  console.log(calculation); // Log the current calculation for debugging
  localStorage.setItem("calculation", calculation); // Save to local storage
}

/**
 * Function to calculate the result of the current calculation
 */
function calculateResult() {
  try {
    calculation = eval(calculation); // Evaluate the calculation
    console.log(calculation); // Log the result for debugging
    showCalculation(); // Update the display
  } catch (error) {
    console.error("Error in calculation:", error); // Log any errors
    alert("Invalid calculation!"); // Alert the user
  }
}

/**
 * Function to clear the current calculation
 */
function clearCalculation() {
  calculation = ""; // Reset calculation
  localStorage.removeItem("calculation"); // Clear from local storage
  showCalculation(); // Update the display
}

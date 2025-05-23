/**
 * Returns the BMI category given the BMI number.
 * @param {number} bmi - The calculated Body Mass Index
 */
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

// Add event listener to the button to run BMI calculation when clicked
document.getElementById("calculateBtn").addEventListener("click", () => {
  // Get input values and convert to numbers
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);
  const resultDiv = document.getElementById("result");

  // Validate weight input
  if (!weight || weight <= 0) {
    resultDiv.textContent = "Please enter a valid weight.";
    resultDiv.style.color = "red";
    return;
  }
  // Validate height input
  if (!heightCm || heightCm <= 0) {
    resultDiv.textContent = "Please enter a valid height.";
    resultDiv.style.color = "red";
    return;
  }

  // Convert height from cm to meters
  const heightM = heightCm / 100;
  // Calculate BMI and round to 1 decimal place
  const bmi = (weight / (heightM * heightM)).toFixed(1);
  // Get BMI category text
  const category = getBMICategory(bmi);

  // Show result with normal text color
  resultDiv.style.color = "#222";
  resultDiv.textContent = `Your BMI is ${bmi} (${category})`;
});

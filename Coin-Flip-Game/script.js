document.addEventListener("DOMContentLoaded", () => {
  const coin = document.getElementById("coin");
  const flipButton = document.getElementById("flip-button");
  const resultText = document.getElementById("result-text");

  // images for heads and tails in materials folder
  const headsImg = "Materials/head.jpg";
  const tailsImg = "Materials/tail.jpg";

  flipButton.addEventListener("click", () => {
    // Disable button during flip
    flipButton.disabled = true;
    resultText.textContent = "";

    // Start flip animation
    coin.classList.add("coin-flip");

    // After 1 second (animation duration), show result
    setTimeout(() => {
      // Remove animation class to reset
      coin.classList.remove("coin-flip");

      // Randomly choose heads or tails
      const isHeads = Math.random() < 0.5;

      // Update coin image and result text
      if (isHeads) {
        coin.src = headsImg;
        resultText.textContent = "Heads!";
      } else {
        coin.src = tailsImg;
        resultText.textContent = "Tails!";
      }

      // Re-enable button
      flipButton.disabled = false;
    }, 1000);
  });
});

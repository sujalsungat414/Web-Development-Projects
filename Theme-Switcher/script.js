const colorPicker = document.getElementById("colorPicker");
const root = document.documentElement;

colorPicker.addEventListener("input", (e) => {
  const pickedColor = e.target.value;
  root.style.setProperty("--background-color", pickedColor);
  // Adjust text color for contrast
  if (isColorDark(pickedColor)) {
    root.style.setProperty("--text-color", "#f0f0f0");
  } else {
    root.style.setProperty("--text-color", "#333333");
  }
});

function isColorDark(color) {
  // color is in hex #rrggbb
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  // counting the perceptive luminance - human eye favors green color
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 128;
}

const themeButtons = document.querySelectorAll(".theme-btn");
themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const bg = btn.getAttribute("data-bg");
    const text = btn.getAttribute("data-text");
    root.style.setProperty("--background-color", bg);
    root.style.setProperty("--text-color", text);
    // Update color picker value to current bg
    colorPicker.value = bg;
  });
});

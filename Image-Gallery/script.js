// List of image URLs to use in the gallery
const images = [
  "https://i.pinimg.com/736x/ac/60/fc/ac60fc3e54dc83b997578ebc709ecf34.jpg",
  "https://i.pinimg.com/736x/dd/1a/2e/dd1a2e65eb75e39d93a346bc244ea91a.jpg",
  "https://images.pexels.com/photos/2325447/pexels-photo-2325447.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/236599/pexels-photo-236599.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/287229/pexels-photo-287229.jpeg?auto=compress&cs=tinysrgb&w=600",
];

// Get references to DOM elements
const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0; // Track the currently displayed image index

// Create gallery thumbnails dynamically
function loadGallery() {
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Image ${index + 1}`;
    img.dataset.index = index; // Store index in data attribute
    img.addEventListener("click", () => openModal(index)); // Open modal on click
    gallery.appendChild(img); // Add image to gallery
  });
}

// Open modal and show image at given index
function openModal(index) {
  currentIndex = index; // Update current index
  modalImage.src = images[currentIndex]; // Set modal image source
  modal.classList.add("open"); // Show modal
  document.body.style.overflow = "hidden"; // Prevent background scroll
}

// Close modal
function closeModal() {
  modal.classList.remove("open"); // Hide modal
  document.body.style.overflow = ""; // Restore background scroll
}

// Show previous image
function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Update index
  modalImage.src = images[currentIndex]; // Update modal image
}

// Show next image
function showNext() {
  currentIndex = (currentIndex + 1) % images.length; // Update index
  modalImage.src = images[currentIndex]; // Update modal image
}

// Listen for click events on controls
closeBtn.addEventListener("click", closeModal);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

// Close modal when clicking outside the image
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal(); // Close modal if background is clicked
  }
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return; // Only if modal is open
  if (e.key === "Escape") {
    closeModal(); // Close modal on Escape key
  } else if (e.key === "ArrowLeft") {
    showPrev(); // Show previous image on left arrow
  } else if (e.key === "ArrowRight") {
    showNext(); // Show next image on right arrow
  }
});

// Initialize gallery on page load
loadGallery();

// Initialize Variables
let index = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");
const slider = document.getElementById("slider");
let interval;

// Function to Show Slide
function showSlide(n) {
  index = (n + totalSlides) % totalSlides;
  const offset = -index * 100;
  document.querySelector(".slides").style.transform = `translateX(${offset}%)`;

  // Update Dots
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

// Next Slide
function nextSlide() {
  showSlide(index + 1);
}

// Previous Slide
function prevSlide() {
  showSlide(index - 1);
}

// Start Automatic Transition
function startInterval() {
  interval = setInterval(nextSlide, 5000); // Change every 5 seconds
}

// Stop Automatic Transition
function stopInterval() {
  clearInterval(interval);
}

// Event Listeners for Navigation Buttons
nextBtn.addEventListener("click", () => {
  stopInterval();
  nextSlide();
  startInterval();
});

prevBtn.addEventListener("click", () => {
  stopInterval();
  prevSlide();
  startInterval();
});

// Event Listeners for Pagination Dots
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    stopInterval();
    const newIndex = parseInt(e.target.dataset.index);
    showSlide(newIndex);
    startInterval();
  });
});

// Pause on Hover
slider.addEventListener("mouseenter", stopInterval);
slider.addEventListener("mouseleave", startInterval);

// Swipe Functionality for Touch Devices
let startX = 0;
let isSwiping = false;

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

slider.addEventListener("touchmove", (e) => {
  if (!isSwiping) return;
  const moveX = e.touches[0].clientX;
  const diff = startX - moveX;

  if (diff > 50) {
    nextSlide();
    isSwiping = false;
    stopInterval();
    startInterval();
  } else if (diff < -50) {
    prevSlide();
    isSwiping = false;
    stopInterval();
    startInterval();
  }
});

slider.addEventListener("touchend", () => {
  isSwiping = false;
});

// Initialize Slider
showSlide(index);
startInterval();

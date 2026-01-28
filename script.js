let allImages = document.querySelectorAll(".gallery img");
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");

let visibleImages = [];
let currentIndex = 0;

// Update visible images list
function updateVisibleImages() {
  visibleImages = Array.from(allImages).filter(img => {
    return img.style.display !== "none";
  });
}

// Add click event to images dynamically
allImages.forEach(img => {
  img.addEventListener("click", () => {
    updateVisibleImages();
    currentIndex = visibleImages.indexOf(img);
    openLightbox();
  });
});

// Open Lightbox
function openLightbox() {
  if (currentIndex === -1) return;
  lightboxImg.src = visibleImages[currentIndex].src;
  lightbox.classList.add("show");
}

// Close Lightbox
function closeLightbox() {
  lightbox.classList.remove("show");
}

// Next / Prev navigation
function changeImage(step) {
  currentIndex += step;

  if (currentIndex < 0) currentIndex = visibleImages.length - 1;
  if (currentIndex >= visibleImages.length) currentIndex = 0;

  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    lightboxImg.src = visibleImages[currentIndex].src;
    lightboxImg.style.opacity = 1;
  }, 200);
}

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (lightbox.classList.contains("show")) {
    if (e.key === "ArrowRight") changeImage(1);
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "Escape") closeLightbox();
  }
});

// Filter images
function filterImages(category) {
  allImages.forEach(img => {
    if (category === "all" || img.classList.contains(category)) {
      img.style.display = "block";
      setTimeout(() => img.style.opacity = "1", 100);
    } else {
      img.style.opacity = "0";
      setTimeout(() => img.style.display = "none", 200);
    }
  });
}

// Search images
function searchImages() {
  let search = document.getElementById("searchBox").value.toLowerCase();

  allImages.forEach(img => {
    let name = img.dataset.name.toLowerCase();
    if (name.includes(search)) {
      img.style.display = "block";
      setTimeout(() => img.style.opacity = "1", 100);
    } else {
      img.style.opacity = "0";
      setTimeout(() => img.style.display = "none", 200);
    }
  });
}

// Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

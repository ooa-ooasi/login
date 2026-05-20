/**
 * js/lightbox.js
 * Full-screen image lightbox with prev/next navigation and keyboard support.
 */

const images = [
  "img/news_images/AITR/guide1.jpg",
  "img/news_images/AITR/guide2.jpg",
  "img/news_images/AITR/guide3.jpg",
  "img/news_images/AITR/guide4.jpg",
  "img/news_images/AITR/guide5.jpg",
  "img/news_images/AITR/guide6.jpg",
  "img/news_images/AITR/guide7.jpg",
  "img/news_images/AITR/guide8.jpg",
  "img/news_images/AITR/guide9.jpg",
  "img/news_images/AITR/guide10.jpg",
  "img/news_images/AITR/guide11.jpg",
  "img/news_images/AITR/guide12.jpg",
  "img/news_images/AITR/guide13.jpg",
  "img/news_images/AITR/guide14.jpg",
  "img/news_images/AITR/guide15.jpg",
  "img/news_images/AITR/guide16.jpg",
  "img/news_images/AITR/guide17.jpg",
  "img/news_images/AITR/guide18.jpg",
  "img/news_images/AITR/guide19.jpg",
  "img/news_images/AITR/guide20.jpg",
  "img/news_images/AITR/guide21.jpg",
  "img/news_images/AITR/guide22.jpg",
  "img/news_images/AITR/guide23.jpg",
  "img/news_images/AITR/guide24.jpg",
  "img/news_images/AITR/guide25.jpg",
  "img/news_images/AITR/guide26.jpg"
];

let currentIndex = 0;
const lightbox    = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function showImage() {
  lightboxImg.src = images[currentIndex];
}

document.addEventListener("click", (event) => {
  const trigger = event.target.closest(".lightbox-trigger");

  if (!trigger) return;

  const requestedIndex = Number(trigger.dataset.lightboxIndex);

  lightbox.style.display = "block";
  currentIndex = Number.isInteger(requestedIndex) ? requestedIndex : Math.max(0, images.indexOf(trigger.getAttribute("src")));
  showImage();
});

document.querySelector(".close").onclick  = () => { lightbox.style.display = "none"; };
document.querySelector(".prev").onclick   = () => { currentIndex = (currentIndex - 1 + images.length) % images.length; showImage(); };
document.querySelector(".next").onclick   = () => { currentIndex = (currentIndex + 1) % images.length; showImage(); };

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display !== "block") return;
  if (e.key === "ArrowLeft")  { currentIndex = (currentIndex - 1 + images.length) % images.length; showImage(); }
  if (e.key === "ArrowRight") { currentIndex = (currentIndex + 1) % images.length; showImage(); }
  if (e.key === "Escape")     { lightbox.style.display = "none"; }
});

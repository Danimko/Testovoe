const prev = document.querySelector("#btn__prev");
const next = document.querySelector("#btn__next");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const sliderLine = document.querySelector(".slider__wrapper");

let x1 = null;
let y1 = null;
let index = 0;
let width;
let offset = 0;
////полоска
const activeDot = (n) => {
  for (let dot of dots) {
    dot.classList.remove("active");
  }
  dots[n].classList.add("active");
};
//////перелистывание
function rollSlider() {
  sliderLine.style.transform = "translate(-' + index * width + 'px)";
}

const nextSlide = () => {
  index++;
  offset = offset + 16.25;
  if (offset >= 65) {
    index = 0;
    offset = 0;
  }
  sliderLine.style.left = -offset + "rem";
  activeDot(index);
};

const prevSlide = () => {
  index--;
  offset = offset - 16.25;
  if (offset < 0) {
    index = slides.length - 1;
    offset = 48.75;
  }
  sliderLine.style.left = -offset + "rem";
  activeDot(index);
};

/////свайпы(только мобильная версия)
function handleTouchstart(event) {
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false;
  }
  let x2 = event.touches[0].clientX;
  let y2 = event.touches[0].clientY;
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    //праволево
    if (xDiff > 0) prevSlide();
    else nextSlide();
  } else {
    if (yDiff > 0);
    else;
  }

  x1 = null;
  y1 = null;
}



next.addEventListener("click", nextSlide);

prev.addEventListener("click", prevSlide);

setInterval(nextSlide, 4000);

sliderLine.addEventListener("touchstart", handleTouchstart, false);
sliderLine.addEventListener("touchmove", handleTouchMove, false);


const prev = document.querySelector("#btn__prev");
const next = document.querySelector("#btn__next");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const sliderLine = document.querySelector(".slider__wrapper");
const slider = document.querySelector(".wrapper");

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
// function rollSlider() {
//   sliderLine.style.transform = "translate(-' + index * width + 'px)";
// }

const nextSlide = () => {
  index++;
  offset = offset + 17.75;
  if (offset >= 65) {
    index = 0;
    offset = 0;
  }
  sliderLine.style.left = -offset + "rem";
  activeDot(index);
};

const prevSlide = () => {
  index--;
  offset = offset - 17.75;
  if (offset < 0) {
    index = slides.length - 1;
    offset = 53.25;
  }
  sliderLine.style.left = -offset + "rem";
  activeDot(index);
};

/////свайпы(только мобильная версия)

sliderLine.addEventListener("touchstart", handleTouchstart, false);
sliderLine.addEventListener("touchmove", handleTouchMove, false);

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

// setInterval(nextSlide, 4000);




////////////Плохо работает с сетИнтервалом

//
// let slideWidth = slides[0].offsetWidth;
// let slideIndex = 0;
// let posInit = 0;
// let posX1 = 0;
// let posX2 = 0;
// let posY1 = 0;
// let posY2 = 0;
// let posFinal = 0;
// let isSwipe = false;
// let isScroll = false;
// let allowSwipe = true;
// let transition = true;
// let nextTrf = 0;
// let prevTrf = 0;
// let lastTrf = --slides.length * slideWidth;
// let posThreshold = slides[0].offsetWidth * 0.35;
// let trfRegExp = /([-0-9.]+(?=px))/;
// let getEvent = function () {
//   return event.type.search("touch") !== -1 ? event.touches[0] : event;
// };
// let slide = function () {
//   if (transition) {
//     sliderLine.style.transition = "transform .5s";
//   }
//   sliderLine.style.transform = `translate3d(-${
//     slideIndex * slideWidth
//   }px, 0px, 0px)`;
// };
// swipeStart = function () {
//   let evt = getEvent();

//   if (allowSwipe) {
//     transition = true;

//     nextTrf = (slideIndex + 1) * -slideWidth;
//     prevTrf = (slideIndex - 1) * -slideWidth;

//     posInit = posX1 = evt.clientX;
//     posY1 = evt.clientY;

//     sliderLine.style.transition = "";

//     document.addEventListener("touchmove", swipeAction);
//     document.addEventListener("mousemove", swipeAction);
//     document.addEventListener("touchend", swipeEnd);
//     document.addEventListener("mouseup", swipeEnd);

//     slider.classList.remove("grab");
//     slider.classList.add("grabbing");
//   }
// };
// swipeAction = function () {
//   let evt = getEvent(),
//     style = sliderLine.style.transform,
//     transform = +style.match(trfRegExp)[0];

//   posX2 = posX1 - evt.clientX;
//   posX1 = evt.clientX;

//   posY2 = posY1 - evt.clientY;
//   posY1 = evt.clientY;

//   // определение действия свайп или скролл
//   if (!isSwipe && !isScroll) {
//     let posY = Math.abs(posY2);
//     if (posY > 7 || posX2 === 0) {
//       isScroll = true;
//       allowSwipe = false;
//     } else if (posY < 7) {
//       isSwipe = true;
//     }
//   }

//   if (isSwipe) {
//     // запрет ухода влево на первом слайде
//     if (slideIndex === 0) {
//       if (posInit < posX1) {
//         setTransform(transform, 0);
//         return;
//       } else {
//         allowSwipe = true;
//       }
//     }

//     // запрет ухода вправо на последнем слайде
//     if (slideIndex === --slides.length) {
//       if (posInit > posX1) {
//         setTransform(transform, lastTrf);
//         return;
//       } else {
//         allowSwipe = true;
//       }
//     }

//     // запрет протаскивания дальше одного слайда
//     if (
//       (posInit > posX1 && transform < nextTrf) ||
//       (posInit < posX1 && transform > prevTrf)
//     ) {
//       reachEdge();
//       return;
//     }

//     // двигаем слайд
//     sliderLine.style.transform = `translate3d(${
//       transform - posX2
//     }px, 0px, 0px)`;
//   }
// };
// swipeEnd = function () {
//   posFinal = posInit - posX1;

//   isScroll = false;
//   isSwipe = false;

//   document.removeEventListener("touchmove", swipeAction);
//   document.removeEventListener("mousemove", swipeAction);
//   document.removeEventListener("touchend", swipeEnd);
//   document.removeEventListener("mouseup", swipeEnd);

//   slider.classList.add("grab");
//   slider.classList.remove("grabbing");

//   if (allowSwipe) {
//     if (Math.abs(posFinal) > posThreshold) {
//       if (posInit < posX1) {
//         slideIndex--;
//       } else if (posInit > posX1) {
//         slideIndex++;
//       }
//     }

//     if (posInit !== posX1) {
//       allowSwipe = false;
//       slide();
//     } else {
//       allowSwipe = true;
//     }
//   } else {
//     allowSwipe = true;
//   }
// };
// setTransform = function (transform, comapreTransform) {
//   if (transform >= comapreTransform) {
//     if (transform > comapreTransform) {
//       sliderLine.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
//     }
//   }
//   allowSwipe = false;
// };
// reachEdge = function () {
//   transition = false;
//   swipeEnd();
//   allowSwipe = true;
// };

// sliderLine.style.transform = "translate3d(0px, 0px, 0px)";
// slider.classList.add("grab");

// sliderLine.addEventListener("transitionend", () => (allowSwipe = true));
// slider.addEventListener("touchstart", swipeStart);
// slider.addEventListener("mousedown", swipeStart);

// slide();

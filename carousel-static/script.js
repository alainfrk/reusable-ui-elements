/* *** INDEX OF SCRIPT ***

    1. DOM-related variables, JS general variable and Event Listeners

    2. function showSlide(slide)
        => hide all slides and show the chosen one

    3. function buttonPrevious()
        => Show previous slide

    4. function buttonNext()
        => Show next slide
    
    5. function enableBtnRound()
        => Add eventListeners to each round buttons

    6. function selectBtnRound(btnRound)
        => Show the corresponding image relative to clicked round button (ex: click third button to show 3rd image)
    
    7. function highlightBtnRound(btnRound)
        => Visually highlight the currently selected round button

    8. DOMContentLoaded
        => Show first slide by default(array[0]), addEventListeners to round buttons, highlight the first round button by default


*/

// DOM-related variables
const slidesArray = document.querySelectorAll(".slide");
const btnPrevious = document.getElementById("btn-previous");
const btnNext = document.getElementById("btn-next");
const btnRoundArray = document.querySelectorAll(".btn-round");

// JS general variable and EventListeners
let slidesArrayCurrentPos = 0;

btnPrevious.addEventListener("click", () => {
  buttonPrevious();
});
btnNext.addEventListener("click", () => {
  buttonNext();
});

// FUNCTIONS

function showSlide(slide) {
  slidesArray.forEach((element) => {
    element.style.display = "none";
  });
  slide.style.display = "block";
}

function buttonPrevious() {
  if (slidesArrayCurrentPos === 0) {
    slidesArrayCurrentPos = slidesArray.length - 1;
    showSlide(slidesArray[slidesArrayCurrentPos]);
    highlightBtnRound(btnRoundArray[slidesArrayCurrentPos]);
  } else {
    slidesArrayCurrentPos--;
    showSlide(slidesArray[slidesArrayCurrentPos]);
    highlightBtnRound(btnRoundArray[slidesArrayCurrentPos]);
  }
}

function buttonNext() {
  if (slidesArrayCurrentPos + 1 === slidesArray.length) {
    slidesArrayCurrentPos = 0;
    showSlide(slidesArray[slidesArrayCurrentPos]);
    highlightBtnRound(btnRoundArray[slidesArrayCurrentPos]);
  } else {
    slidesArrayCurrentPos++;
    showSlide(slidesArray[slidesArrayCurrentPos]);
    highlightBtnRound(btnRoundArray[slidesArrayCurrentPos]);
  }
}

function enableBtnRound() {
  btnRoundArray.forEach((element) => {
    element.addEventListener("click", () => selectBtnRound(element));
  });
}

function selectBtnRound(btnRound) {
  highlightBtnRound(btnRound);
  const selectedBtnIndex = parseInt(btnRound.getAttribute("data-btn-index"), 10);
  slidesArrayCurrentPos = selectedBtnIndex;
  showSlide(slidesArray[slidesArrayCurrentPos]);
}

function highlightBtnRound(btnRound) {
  btnRoundArray.forEach((element) => {
    element.classList.remove("highlighted");
  });
  btnRound.classList.add("highlighted");
}

// DOMContentLoaded

document.addEventListener("DOMContentLoaded", () => {
  showSlide(slidesArray[slidesArrayCurrentPos]);
  enableBtnRound();
  highlightBtnRound(btnRoundArray[slidesArrayCurrentPos]);
});

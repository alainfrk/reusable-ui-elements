/* *** INDEX OF SCRIPT ***

    1. DOM-related variables, JS general variable and Event Listeners

    2. function fetchData()
      => fetchData and launch createSlides

    3. function createSlides(fetchedData)
     => create an html div for each slide, then launch showSlide (start at first slide by default)

    4. function showSlide(slide)
        => hide all slides and show the chosen one, launch updateSlidePositionText()

    5. function updateSlidePositionText()
      => write the position infos of the current slide

    6. function buttonPrevious()
        => Show previous slide

    7. function buttonNext()
        => Show next slide

    8. DOMContentLoaded
        => launch fetchData

*/

// DOM-related variables
const containerSlides = document.getElementById("container-slides");
const btnPrevious = document.getElementById("btn-previous");
const btnNext = document.getElementById("btn-next");
const sliderPositionText = document.getElementById("slider-position-text");
let slidesArray;

// JS general variables and EventListeners
let fetchedData = [];
let slidesArrayCurrentPos = 0;

btnPrevious.addEventListener("click", () => {
  buttonPrevious();
});
btnNext.addEventListener("click", () => {
  buttonNext();
});

// FUNCTIONS

function fetchData() {
  fetch("images.json")
    .then((response) => response.json())
    .then((data) => {
      fetchedData = data;
      createSlides(fetchedData);
    })
    .catch((error) => console.log(error));
}

function createSlides(fetchedData) {
  fetchedData.forEach((element) => {
    const newSlide = `
      <div class="slide fade-in">
        <p class="slide-text">Hex value : ${element.hexValue}</p>
        <img src="${element.imageURL}" alt="${element.colorName} color" loading="lazy" />
      </div>
    `;
    // as it's a template string and not a node object, can't use appendChild
    containerSlides.insertAdjacentHTML("beforeend", newSlide);
    // IMPORTANT : if you use innerHTML like this :
    // containerSlides.innerHTML += newSlide;
    // => it removes the previously setup EventListeners
  });
  slidesArray = document.querySelectorAll(".slide");
  showSlide(slidesArray[slidesArrayCurrentPos]);
}

function showSlide(slide) {
  slidesArray.forEach((element) => {
    element.style.display = "none";
  });
  slide.style.display = "block";
  updateSlidePositionText();
}

function updateSlidePositionText() {
  sliderPositionText.innerHTML = `image ${slidesArrayCurrentPos + 1} / ${slidesArray.length}`;
}

function buttonPrevious() {
  if (slidesArrayCurrentPos === 0) {
    slidesArrayCurrentPos = slidesArray.length - 1;
    showSlide(slidesArray[slidesArrayCurrentPos]);
  } else {
    slidesArrayCurrentPos--;
    showSlide(slidesArray[slidesArrayCurrentPos]);
  }
}

function buttonNext() {
  if (slidesArrayCurrentPos + 1 === slidesArray.length) {
    slidesArrayCurrentPos = 0;
    showSlide(slidesArray[slidesArrayCurrentPos]);
  } else {
    slidesArrayCurrentPos++;
    showSlide(slidesArray[slidesArrayCurrentPos]);
  }
}

// DOMContentLoaded

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

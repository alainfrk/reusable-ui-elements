/* *** INDEX OF THIS SCRIPT

  1. Setup of DOM and JS common variables. Also add EventListeners

  2. function fetchDataAndInitialDisplay()
    => fetch data once, store it in fetchedData, launch display of the initial page (displayPageNumber)

  3. function displayPageNumber(pageNumber)
    => calculate the beginning and end of the listing to show, launch makePage and functions related to buttons display

  4. function makePage(begin, end)
   => launch pageInfos, slice the fetchedData and launch fillPageWithSlicedData 

  5. function pageInfos(begin, end, totalItems)
   => display informations on the current page

  6. function fillPageWithSlicedData(itemsToDisplay)
    => Display the listing of items in the current page
  
  7. function showButtonsFirstLast()
    => Show buttons "first" and "last" if totalPages > 1
  
  8. function showButtonsPreviousNext()
    => Show/Hide buttons "previous"/"next" if on first or last page
  
  9. function generatePageArrayButtons()
    => Display generated buttons (linked to appropriate pages) based on current page position

  10. DOMContentLoaded
    => launch fetchDataAndInitialDisplay

  SIDE-NOTE : the different json files provided (95items/15items/5items) are for testing purposes, change the default in the fetch.

*/

// DOM-related variables
const listingHTML = document.getElementById("listing");
const buttonsPageNav = document.getElementById("buttons-page-nav");
const btnFirst = document.getElementById("btn-first");
const btnLast = document.getElementById("btn-last");
const btnPrevious = document.getElementById("btn-previous");
const btnNext = document.getElementById("btn-next");
const divBtnPageArray = document.getElementById("div-btn-page-array");

// Add Event Listeners
btnFirst.addEventListener("click", () => {
  displayPageNumber(1);
});

btnLast.addEventListener("click", () => {
  displayPageNumber(totalPages);
});

btnPrevious.addEventListener("click", () => {
  displayPageNumber(currentPage - 1);
});
btnNext.addEventListener("click", () => {
  displayPageNumber(currentPage + 1);
});

// JS common variables
let fetchedData = [];
const itemsPerPage = 10; // Self-explanatory
let currentPage; // By default, it starts at 1 on page load (setup in fetchDataAndInitialDisplay())
let totalPages;
let totalItems;

// IMPORTANT :
// The current script is for making one request and fetching all the data at once.
// It's best suited for small datasets like the wishlist of an individual customer.
function fetchDataAndInitialDisplay() {
  fetch("95items.json")
    .then((response) => response.json())
    .then((data) => {
      totalPages = Math.ceil(data.length / itemsPerPage);
      totalItems = data.length;
      fetchedData = data;

      // As fetching is asynchronous, the following could be executed
      // before the current function if it was put in DomContentLoaded
      displayPageNumber(1);
    })
    .catch((error) => console.log(error));
}

function displayPageNumber(pageNumber) {
  listingHTML.innerHTML = "";
  currentPage = pageNumber;
  const begin = (pageNumber - 1) * itemsPerPage; // example: (1-1)*10=0 or (2-1)*10=10 and so on
  const end = begin + itemsPerPage;
  makePage(begin, end);
  showButtonsFirstLast();
  showButtonsPreviousNext();
  generatePageArrayButtons();
}

function makePage(begin, end) {
  pageInfos(begin, end, totalItems);
  const itemsToDisplay = fetchedData.slice(begin, end);
  fillPageWithSlicedData(itemsToDisplay);
}

function pageInfos(begin, end, totalItems) {
  const viewingItemsInfo = document.getElementById("viewing-items-info");
  const beginItem = begin + 1;
  const endItem = Math.min(end, totalItems); // When the items on the last page are less than what can be displayed
  viewingItemsInfo.innerText = `${beginItem} - ${endItem} of ${totalItems} total`;
}

function fillPageWithSlicedData(itemsToDisplay) {
  itemsToDisplay.forEach((element) => {
    const newItem = document.createElement("p");
    newItem.innerText = `${element.idNumber} - ${element.cityName}`;
    listingHTML.appendChild(newItem);
  });
}

function showButtonsFirstLast() {
  if (totalPages > 1) {
    btnFirst.style.display = "block";
    btnLast.style.display = "block";
  } else {
    btnFirst.style.display = "none";
    btnLast.style.display = "none";
  }
}

// NOTE : if you wish the Previous/Next buttons to always stay visible, you can use the commented "disabled" boolean
function showButtonsPreviousNext() {
  if (currentPage <= 1) {
    //btnPrevious.disabled = true;
    btnPrevious.style.display = "none";
  } else {
    //btnPrevious.disabled = false;
    btnPrevious.style.display = "block";
  }
  if (currentPage >= totalPages) {
    //btnNext.disabled = true;
    btnNext.style.display = "none";
  } else {
    //btnNext.disabled = false;
    btnNext.style.display = "block";
  }
}

function generatePageArrayButtons() {
  divBtnPageArray.innerHTML = ""; // Clear the current buttons as we navigate through pages

  // Calculate begin and end of the array of buttons (currently setup for 5 buttons/pages maximum)
  // To add/remove buttons before and after the current page button, play with the arguments
  let beginPageButton = Math.max(1, currentPage - 2); // ex : If currentPage= 4 => 2 => begin at 2
  let endPageButton = Math.min(totalPages, currentPage + 2); // ex: If currentPage = 4 => 6 => ends at 6 if totalPages is greater

  for (let i = beginPageButton; i <= endPageButton; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", function () {
      displayPageNumber(i);
    });

    // Emphasize the current page button
    if (i === currentPage) {
      btn.style.fontWeight = "bold";
      btn.style.borderWidth = "3px";
    }

    divBtnPageArray.appendChild(btn);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchDataAndInitialDisplay();
});

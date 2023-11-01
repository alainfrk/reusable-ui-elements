/* *** INDEX OF THE CURRENT SCRIPT ***

    1. function fillTabsAndPanels (items)
        => Fill Tabs and Panels from fetched data

    2. function assignPanelsAndTabsAndEventListeners()
        => Assigning EventListeners to Tabs

    3. function showPanelAndSelectTab(panelId, tabId)
        => Hide all panels then show the chosen one, deselect all tabs and select chosen one

    4. DOMContentLoaded
        => Fetching the data on page load, fill texts, add eventListeners and start with the first item

*/

// FUNCTION : fillTabsAndPanels
// Note : in the JSON, "items" is defined as an array
function fillTabsAndPanels(items) {
  items.forEach((element, index) => {
    const tab = document.getElementById(`item-tab-${index + 1}`);
    tab.innerText = element.tab;

    const panel = document.getElementById(`item-panel-${index + 1}`);
    panel.querySelector("h3").innerText = element.title;
    panel.querySelector("p").innerText = element.article;
  });
}

// FUNCTION : assignPanelsAndTabsAndEventListeners
// Note : as the layout is static, you know how many items will be shown in the DOM
function assignPanelsAndTabsAndEventListeners() {
  const totalItemsInDOM = 3;

  for (let i = 1; i <= totalItemsInDOM; i++) {
    const targetedPanel = document.getElementById(`item-panel-${i}`);
    const targetedTab = document.getElementById(`item-tab-${i}`);

    targetedTab.addEventListener("click", () => showPanelAndSelectTab(targetedPanel, targetedTab));
  }
}

// FUNCTION : showPanelAndSelectTab
const itemPanels = document.querySelectorAll(".item-panel");
const itemTabs = document.querySelectorAll(".item-tab");

function showPanelAndSelectTab(panelId, tabId) {
  itemPanels.forEach((element) => {
    element.style.display = "none";
  });
  panelId.style.display = "block";

  itemTabs.forEach((element) => {
    element.classList.remove("item-tab-selected");
  });
  tabId.classList.add("item-tab-selected");
}

// DOMContentLoaded
// Note : Added a specific error message for failed response
document.addEventListener("DOMContentLoaded", () => {
  fetch("content.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error at getting the response : " + response.status);
      } else {
        return response.json();
      }
    })
    .then((data) => {
      //console.log(data);
      fillTabsAndPanels(data.items);
      assignPanelsAndTabsAndEventListeners();

      // Show item 1 by default on page load
      const itemPanel1 = document.getElementById("item-panel-1");
      const itemTab1 = document.getElementById("item-tab-1");
      showPanelAndSelectTab(itemPanel1, itemTab1);
    })
    .catch((error) => {
      console.log("DOMContentLoaded Error : " + error);
    });
});

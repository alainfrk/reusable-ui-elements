/* *** LOGIC FOR TABS BASED ON STATIC CONTENT ****/

// FUNCTION : Hide all panels then show the chosen one, deselect all tabs and select chosen one
function showPanelAndSelectTab(panelId, tabId){
    const itemPanels = document.querySelectorAll('.item-panel');
    itemPanels.forEach(element => {
        element.style.display = 'none';
    });
    panelId.style.display = 'block';

    // Note : background-color could be defined here but I prefer to keep it in the CSS file
    const itemTabs = document.querySelectorAll('.item-tab');
    itemTabs.forEach(element => {
        element.classList.remove('item-tab-selected')
    });
    tabId.classList.add('item-tab-selected');
}

let itemPanel1 = document.getElementById('item-panel-1');
let itemPanel2 = document.getElementById('item-panel-2');
let itemPanel3 = document.getElementById('item-panel-3');

let itemTab1 = document.getElementById('item-tab-1');
itemTab1.addEventListener('click', () => showPanelAndSelectTab(itemPanel1, itemTab1));

let itemTab2 = document.getElementById('item-tab-2');
itemTab2.addEventListener('click', () => showPanelAndSelectTab(itemPanel2, itemTab2));

let itemTab3 = document.getElementById('item-tab-3');
itemTab3.addEventListener('click', () => showPanelAndSelectTab(itemPanel3, itemTab3));

// Show panel 1 by default on page load
showPanelAndSelectTab(itemPanel1, itemTab1)
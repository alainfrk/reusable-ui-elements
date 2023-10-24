/* *** LOGIC FOR TABS BASED ON STATIC CONTENT ****/

// FUNCTION : Hide all panels then show the chosen one, deselect all tabs and select chosen one
function showPanelAndSelectTab(panelId, tabId, itemColor){

    // Reminder: style settings through JS count as inline-style so they have higher priority than CSS
    const itemTabs = document.querySelectorAll('.item-tab');
    itemTabs.forEach(element => {
        element.style.backgroundColor = '';
        element.classList.add('item-tab-unselected')
    });
    tabId.style.backgroundColor = `var(--color-${itemColor})`;

    const itemPanels = document.querySelectorAll('.item-panel');
    itemPanels.forEach(element => {
        element.style.display = 'none';
    });
    panelId.style.display = 'block';
    panelId.style.backgroundColor = `var(--color-${itemColor})`;
   
}

let itemPanel1 = document.getElementById('item-panel-1');
let itemPanel2 = document.getElementById('item-panel-2');
let itemPanel3 = document.getElementById('item-panel-3');

let itemTab1 = document.getElementById('item-tab-1');
itemTab1.addEventListener('click', () => showPanelAndSelectTab(itemPanel1, itemTab1, 'itemColor1'));

let itemTab2 = document.getElementById('item-tab-2');
itemTab2.addEventListener('click', () => showPanelAndSelectTab(itemPanel2, itemTab2, 'itemColor2'));

let itemTab3 = document.getElementById('item-tab-3');
itemTab3.addEventListener('click', () => showPanelAndSelectTab(itemPanel3, itemTab3, 'itemColor3'));

// Show panel 1 by default on page load
showPanelAndSelectTab(itemPanel1, itemTab1, 'itemColor1')
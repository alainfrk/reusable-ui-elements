/* *** INDEX OF THE CURRENT SCRIPT ***

    1. function assignEventListenersAndColors()
        => Assigning EventListeners to Tabs and choosing color.

    2. function showPanelAndSelectTab(panelId, tabId)
        => Hide all panels then show the chosen one, deselect all tabs and select chosen one

    3. DOMContentLoaded
        => on page load : add eventListeners and start with the first item

*/

// FUNCTION : assignEventListenersAndColors
// Note : as the layout is static, you know how many items will be shown in the DOM
function assignEventListenersAndColors(){
    const totalItemsInDOM = 3;

    for(let i = 1; i <= totalItemsInDOM; i++){
        const targetedPanel = document.getElementById(`item-panel-${i}`);
        const targetedTab = document.getElementById(`item-tab-${i}`);
        const targetedColor = `itemColor${i}`;

        targetedTab.addEventListener('click', () => showPanelAndSelectTab(targetedPanel, targetedTab, targetedColor));
    }
}

// FUNCTION : showPanelAndSelectTab
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

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    assignEventListenersAndColors();

    // Show item 1 by default on page load
    const itemPanel1 = document.getElementById('item-panel-1');
    const itemTab1 = document.getElementById('item-tab-1');
    showPanelAndSelectTab(itemPanel1, itemTab1, 'itemColor1');
})
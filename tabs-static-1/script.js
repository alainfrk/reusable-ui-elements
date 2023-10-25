/* *** INDEX OF THE CURRENT SCRIPT ***

    1. function assignPanelsAndTabsAndEventListeners()
        => Assigning EventListeners to Tabs

    2. function showPanelAndSelectTab(panelId, tabId)
        => Hide all panels then show the chosen one, deselect all tabs and select chosen one

    3. DOMContentLoaded
        => on page load : add eventListeners and start with the first item

*/

// FUNCTION : assignPanelsAndTabsAndEventListeners
// Note : as the layout is static, you know how many items will be shown in the DOM
function assignPanelsAndTabsAndEventListeners(){
    const totalItemsInDOM = 3;

    for(let i = 1; i <= totalItemsInDOM; i++){
        const targetedPanel = document.getElementById(`item-panel-${i}`);
        const targetedTab = document.getElementById(`item-tab-${i}`);

        targetedTab.addEventListener('click', () => showPanelAndSelectTab(targetedPanel, targetedTab));
    }
}

// FUNCTION : showPanelAndSelectTab
const itemPanels = document.querySelectorAll('.item-panel');
const itemTabs = document.querySelectorAll('.item-tab');

function showPanelAndSelectTab(panelId, tabId){ 
    itemPanels.forEach(element => {
        element.style.display = 'none';
    });
    panelId.style.display = 'block';
    
    itemTabs.forEach(element => {
        element.classList.remove('item-tab-selected')
    });
    tabId.classList.add('item-tab-selected');
}

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    assignPanelsAndTabsAndEventListeners();

    // Show item 1 by default on page load
    const itemPanel1 = document.getElementById('item-panel-1');
    const itemTab1 = document.getElementById('item-tab-1');
    showPanelAndSelectTab(itemPanel1, itemTab1);
})
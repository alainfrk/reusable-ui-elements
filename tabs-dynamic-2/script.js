/* *** INDEX OF THE CURRENT SCRIPT ***

    1. function createTabsAndPanels (items)
        => Create Tabs and Panels from fetched data

    2. function assignPanelsAndTabsAndEventListeners()
        => Assigning EventListeners to Tabs

    3. function showPanelAndSelectTab(panelId, tabId)
        => Hide all panels then show the chosen one, deselect all tabs and select chosen one

    4. DOMContentLoaded
        => Fetching the data on page load, fill texts, add eventListeners and start with the first item

*/

// FUNCTION : createTabsAndPanels
// Note : "items" is from the fetched JSON
const tabsDynamic = document.getElementById('tabs-dynamic');
const mainPanel = document.getElementById('main-panel');

function createTabsAndPanels (items){
    items.forEach((element, index) =>{
        const createdDiv = document.createElement('div');
        createdDiv.id = `item-tab-${index+1}`;
        createdDiv.classList.add('item-tab');
        createdDiv.innerHTML = element.tab;
        tabsDynamic.appendChild(createdDiv);

        const createdArticle = document.createElement('article');
        createdArticle.id = `item-panel-${index+1}`;
        createdArticle.classList.add('item-panel');

        const h3 = document.createElement('h3');
        h3.textContent = element.title;
        createdArticle.appendChild(h3);

        const p = document.createElement('p');
        p.textContent = element.article;
        createdArticle.appendChild(p);

        mainPanel.appendChild(createdArticle)
    })
}

// FUNCTION : assignPanelsAndTabsAndEventListeners
// Note : numberOfItems is determined by the number of entries in the array "items" of the fetched json
function assignPanelsAndTabsAndEventListeners(numberOfItems){

    for(let i = 1; i <= numberOfItems; i++){
        const targetedPanel = document.getElementById(`item-panel-${i}`);
        const targetedTab = document.getElementById(`item-tab-${i}`);

        targetedTab.addEventListener('click', () => showPanelAndSelectTab(targetedPanel, targetedTab));
    }
}

// FUNCTION : showPanelAndSelectTab
// IMPORTANT NOTE : const itemPanels and itemTabs moved inside the function 
// as the numbers of items could vary at runtime depending of your application
// so it's updated each time the user click
function showPanelAndSelectTab(panelId, tabId){
    const itemPanels = document.querySelectorAll('.item-panel');
    const itemTabs = document.querySelectorAll('.item-tab');

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
    fetch('content.json')
        .then(response => {
            if(!response.ok){
                throw new Error('Error at getting the response : ' +response.status);
            }else{
                return response.json();
            }
        })
        .then(data => {
            //console.log(data);
            createTabsAndPanels(data.items);
            assignPanelsAndTabsAndEventListeners((data.items).length);

            // Show item 1 by default on page load
            const itemPanel1 = document.getElementById('item-panel-1');
            const itemTab1 = document.getElementById('item-tab-1');
            showPanelAndSelectTab(itemPanel1, itemTab1);
        })
        .catch(error => {
            console.log('DOMContentLoaded Error : ' +error)
        })
})
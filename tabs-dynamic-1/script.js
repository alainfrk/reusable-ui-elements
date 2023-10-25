/* *** LOGIC FOR TABS BASED ON DYNAMIC CONTENT ****/

// NOTE : DOMContentLoaded event at the end of the file

// FUNCTION : Hide all panels then show the chosen one, deselect all tabs and select chosen one
function showPanelAndSelectTab(panelId, tabId){
    const itemPanels = document.querySelectorAll('.item-panel');
    itemPanels.forEach(element => {
        element.style.display = 'none';
    });
    panelId.style.display = 'block';

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


// Function to fill Tabs and Panels from fetched data
// Note : in the JSON, "items" is defined as an array
function fillTabsAndPanels (items){
    items.forEach((element, index) =>{
        const tab = document.getElementById(`item-tab-${index+1}`);
        tab.innerHTML = element.tab;

        const panel = document.getElementById(`item-panel-${index+1}`);
        panel.querySelector('h3').innerHTML = element.title;
        panel.querySelector('p').innerHTML = element.article;
    }
        
    )
}

// Fetching the data on page load, fill texts and start with first item
// Note : Added a specific error message for failed response
document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => {
            if(!response.ok){
                throw new Error('Error at getting the response :' +response.status);
            }else{
                return response.json();
            }
        })
        .then(data => {
            console.log(data);
            fillTabsAndPanels(data.items);
            showPanelAndSelectTab(itemPanel1, itemTab1);
        })
        .catch(error => {
            console.log('DOMContentLoaded Error : ' +error)
        })
})
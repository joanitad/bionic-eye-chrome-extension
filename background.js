var CONTEXT_MENU_CONTENTS = {
  forSelection: [
    'Convert to Bionic Reading Text'
  ]
}

function setUpContextMenus() {
  CONTEXT_MENU_CONTENTS.forSelection.forEach(function(commandId) {
    chrome.contextMenus.create({
      type: "separator",
      id: 'sep1',
      contexts: ['selection']
    });
    chrome.contextMenus.create( {
      title: commandId,
      id: commandId,
      contexts: ['selection']
    });
  });
}

chrome.runtime.onInstalled.addListener(function() {
  // When the app gets installed, set up the context menus
  setUpContextMenus();
});


chrome.contextMenus.onClicked.addListener(function(itemData) {
  if (itemData.menuItemId == "Convert to Bionic Reading Text") {
    chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
        chrome.scripting.executeScript(
          {
            target: {tabId: tab.id},
            files: ['content_scripts.js'],
          }
        );
      });
  }
});

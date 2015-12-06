var sKeyDown = false;

addEventListener('keydown', function(e) {
  var keys = {'83': 's'};
  if (keys[e.keyCode] === 's' && !sKeyDown) {
    sKeyDown = true;
    addEventListener('keyup', function(e) {
      if (keys[e.keyCode] === 's') {
        sKeyDown = false;
        removeEventListener('keyup');
      }
    });
  }
});

addEventListener('mouseup', function(e) {
  if (sKeyDown) {
    saveText(getSelection().toString());
  }
});
  
function saveText(text) {
  if (text) {
    chrome.storage.sync.get('selections', function(storageObject) {
      chrome.storage.sync.set({'selections': storageObject.selections + '\n' + text}, function() {
        console.log('Text selection successfully saved: ');
        chrome.storage.sync.get('selections', function(storageObject) {
          console.log(storageObject.selections);
        });
      });
    });
  }
}

function sendSelections() {
  chrome.storage.sync.get('selections', function(storageObject) {
    // Figure out how to send the selections to popup.js so that the 
    // selections can be visible when the user presses the extension button.
  });
}

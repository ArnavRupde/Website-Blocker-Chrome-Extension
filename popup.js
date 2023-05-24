document.addEventListener("DOMContentLoaded", function () {
    var websiteInput = document.getElementById("websiteInput");
    var addButton = document.getElementById("addButton");
  
    addButton.addEventListener("click", function () {
      var host = websiteInput.value.trim();
      if (host) {
        chrome.storage.sync.get("blockedWebsites", function (data) {
          var blockedWebsites = data.blockedWebsites || [];
          blockedWebsites.push(host);
          chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function () {
            addToWebsiteList(host);
            websiteInput.value = "";
          });
        });
      }
    });
  
    function addToWebsiteList(website) {
      var tableRef = document.getElementById('websiteList');
      var newRow = tableRef.insertRow();
      var newCell1 = newRow.insertCell();
      newCell1.setAttribute("class", "text-center")
      var newCell2 = newRow.insertCell();
      var h = document.createElement("H4");
      var t = document.createTextNode(website);
      h.appendChild(t);
      newCell1.appendChild(h);
      var removeButton = document.createElement("button");
      removeButton.setAttribute ("type", "button");
      removeButton.setAttribute ("class", "btn btn-danger");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
      removeWebsite(website);
      li.remove();
      });
      newCell2.appendChild(removeButton);
    }

    function removeWebsite(website) {
        chrome.storage.sync.get("blockedWebsites", function (data) {
          var blockedWebsites = data.blockedWebsites || [];
          var index = blockedWebsites.indexOf(website);
          if (index > -1) {
            blockedWebsites.splice(index, 1);
            chrome.storage.sync.set({ blockedWebsites: blockedWebsites });
            populateBlockedWebsites();
          }
        });
      }
    
    function populateBlockedWebsites() {
      var tableHeaderRowCount = 0;
      var tableRef = document.getElementById('websiteList');
      var rowCount = tableRef.rows.length;
      for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tableRef.deleteRow(tableHeaderRowCount);
      }

      chrome.storage.sync.get("blockedWebsites", function (data) {
        var blockedWebsites = data.blockedWebsites || [];
        blockedWebsites.forEach(function (website) {
          addToWebsiteList(website);
        });
      });
    }
    populateBlockedWebsites();
  });
  
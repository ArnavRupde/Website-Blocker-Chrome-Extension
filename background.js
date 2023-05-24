chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    var url = new URL(details.url);
    var host = url.hostname;

    chrome.storage.sync.get("blockedWebsites", function (data) {
      var blockedWebsites = data.blockedWebsites || [];
      if (blockedWebsites.includes(host)) {
        chrome.tabs.update({url: 'blocked.html'});
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
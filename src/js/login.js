(function () {
  function sendMessage(msg) {
    var iframeEl = document.getElementById('account-discovery');
    var iframeWin = iframeEl.contentWindow;
    var origin = iframeEl.src.replace('iframe.html', '');
    iframeWin.postMessage(msg, origin);
  }

  function receiveMessage(event) {
    console.log(`Receive event from ${event.origin} with data`, event.data);

    var accounts, el;
    switch (event.data.type) {
    case 'iframe_loaded':
      sendMessage({type: 'get_accounts'});
      break;
    case 'processed_get_accounts':
      document.getElementById('accounts').innerText = JSON.stringify(event.data, null, 2);
      break;
    }
  }

  window.addEventListener('message', receiveMessage, false);
})();
(function () {
  const trustedDomain = ['hw.com', 'hw-preview.com'];

  const STORAGE_KEY = 'okta_accounts';

  function getAccounts() {
    try {
      var accounts = localStorage.getItem(STORAGE_KEY);
      return accounts ? JSON.parse(accounts) : [];
    } catch (e) {
      console.error('get accounts:', e)
      return [];
    }
  }

  function addAccount(data, origin) {
    const newAccount = {
      id: origin + '::' + data.login,
      login: data.login,
      displayName: data.displayName,
      origin: origin,
      lastUpdated: new Date().toISOString()
    };
  
    try {
      const accounts = getAccounts(localStorage);
      accounts.push(newAccount);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
    } catch (e) {
      console.error('add account', e);
    }
  }
  
  const handlers = {
    'get_accounts': getAccounts,
    'login': addAccount,
  }

  const listener = (e) => {
    const origin = e.origin;
    const data = e.data;

    const isValidDomain = trustedDomain.some((d) => {
      return origin.indexOf(d) > 0;
    })

    if (!isValidDomain) {
      console.warn('not valid trust domain: ', origin);
    }

    if (!handlers[data.type]) {
      console.warn('no handler for type ', data.type);
    }
  
    const resp = handlers[data.type](data, origin);
    e.source.postMessage(Object.assign({type: `processed_${data.type}`}, resp), e.origin);
  }

  window.addEventListener('message', listener, false);

  if (window.parent) {
    window.parent.postMessage({type: 'iframe_loaded'}, '*');
  }

})();
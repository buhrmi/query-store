const store = require('svelte/store');

const query = store.writable({}) 
query.navigatable = []

// TODO: figure out a way to support SSR
if (typeof window !== 'undefined') {
  
  const initial = {}
  let duringPopState = false
  const setStoreFromURL = () => {
    const params = new URLSearchParams(window.location.search)
    for (const [param, value] of params) {
      try {
        value = JSON.parse(value)
      }
      catch { /* wasnt json. dont care */ }
      initial[param] = value
    }
    duringPopState = true
    query.set(initial) 
    duringPopState = false
  }

  setStoreFromURL()
  window.addEventListener('popstate', setStoreFromURL)

  let oldParams = initial
  query.subscribe(params => {
    if (duringPopState) return
    if (typeof history == 'undefined') return
    let search = ''
    let pushHistory = false
    for (const param in params) {
      let value = params[param]
      search += (search ? '&' : '?')
      if (oldParams[param] !== value && query.navigatable.indexOf(param) !== -1) {
        pushHistory = true
      }
      if (typeof value == 'undefined') continue;
      if (!!value && typeof value == 'object') value = JSON.stringify(value)
      value = encodeURIComponent(value)
      search += param + '=' + value
    }
    oldParams = JSON.parse(JSON.stringify(params))
    if (pushHistory) {
      history.pushState(null, document.title, window.location.pathname + search)
    }
    else {
      history.replaceState(null, document.title, window.location.pathname + search)
    }
  })
}

module.exports = query
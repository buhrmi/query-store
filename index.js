const store = require('svelte/store');

const query = store.writable({}) 
const keepHistory = []
let disableHistory = false

query.setWithoutHistory = (params) => {
  disableHistory = true
  query.set(params)
  disableHistory = false
}

query.keepHistory = function(param) {
  keepHistory.push(param)
}

// TODO: figure out a way to support SSR
if (typeof window !== 'undefined') {
  let initial = {}
  const handlePop = () => {
    
    const params = new URLSearchParams(window.location.search)
    for (const [param, value] of params) {
      try {
        value = JSON.parse(value)
      }
      catch { /* wasnt json. dont care */ }
      initial[param] = value
    }
    
    query.setWithoutHistory(initial)
  }

  handlePop()
  window.addEventListener('popstate', handlePop)

  let oldParams = initial
  query.subscribe(params => {
    if (disableHistory) return
    if (typeof history == 'undefined') return
    let search = ''
    let pushHistory = false
    for (const param in params) {
      let value = params[param]
      search += (search ? '&' : '?')
      if (oldParams[param] !== value && keepHistory.indexOf(param) !== -1) {
        pushHistory = true
      }
      if (typeof value == 'undefined') continue;
      if (!!value && typeof value == 'object') value = JSON.stringify(value)
      value = encodeURIComponent(value)
      search += param + '=' + value
    }
    oldParams = JSON.parse(JSON.stringify(params))
    if (pushHistory) {
      history.pushState(history.state, document.title, window.location.pathname + search)
    }
    else {
      history.replaceState(history.state, document.title, window.location.pathname + search)
    }
  })
}


module.exports = query
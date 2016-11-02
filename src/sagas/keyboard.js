const matchesEvent = (e, keyCodeOrRegex, modifier) => {
  if (typeof keyCodeOrRegex === 'object') {
    return e.key.match(keyCodeOrRegex)
  }
  return e.key === keyCodeOrRegex && (!modifier || e[modifier])
}

export const awaitKeyDown = (keyCodeOrRegex, modifier) => {
  return new Promise((resolve) => {
    const handleEvent = (e) => {
      if (matchesEvent(e, keyCodeOrRegex, modifier)) {
        window.removeEventListener('keydown', handleEvent)
        resolve(e)
      }
    }
    window.addEventListener('keydown', handleEvent)
  })
}

import { _ } from '../utils'

window._ = _

window.time = (id) => {
  const diff = _.time(id)
  if (diff) log(diff.toFixed(0))
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'u') window.DEBUG = true
})

window.td = () => {
  window.DEBUG = !window.DEBUG
}

let logged = false
window.log1 = (...args) => {
  if (logged) return
  console.log.apply(console, args)
  logged = true
}

window.log = (...args) => {
  console.log.apply(console, args)
}

console.warn('RUNNING IN DEBUG MODE')

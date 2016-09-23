import { _ } from '../../utils'

function defineProp(target, name, def) {
  if (!def.get) def.writable = true
  Object.defineProperty(target.prototype, name, Object.assign(def, {
    configurable: true,
    enumerable: true,
  }))
}

function decorateStat(target, name) {
  let current = 0
  let base = 0
  let baseSet = false
  const capitalized = _.s.capitalize(name)

  // obj.baseHealth
  defineProp(target, `base${capitalized}`, {
    get: () => base,
    set: (value) => {
      base = value
      baseSet = true
    },
  })

  // obj.health
  defineProp(target, name, {
    get: () => current,
    set: (value) => {
      current = value
      if (!baseSet) {
        base = value
        baseSet = true
      }
    },
  })
}

export default function stats(...names) {
  return (target) => {
    names.forEach(_.partial(decorateStat, target))
  }
}

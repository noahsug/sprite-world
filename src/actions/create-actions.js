import { _ } from '../utils'

const mapArgs = (names, args) => {
  const map = {}
  names.forEach((name, i) => {
    map[name] = args[i]
  })
  return map
}

/**
 * Usage:
 *   createActions({
 *     add: ['amount']
 *   })
 *
 * Returns:
 *   {  add: (amount) => { type: 'ADD', amount: amount } }
 */
export default function createActions(actions) {
  _.each(actions, (argNames, name) => {
    actions[name] = (...args) => ({
      type: _.s.underscored(name).toUpperCase(),
      ...mapArgs(argNames, args),
    })
  })
  return actions
}

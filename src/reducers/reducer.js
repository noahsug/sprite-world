import { _ } from '../utils'

// Like redux.combineReducers, except allows for additional fields on state that
// won't be passed to the children.
const combineReducers = (children) => {
  if (_.isEmpty(children)) return (state) => ({ ...state })

  const fields = Object.keys(children)
  return (state = {}, action = undefined) => {
    const nextState = { ...state }
    fields.forEach((field) => {
      nextState[field] = children[field](state[field], action)
    })
    return nextState
  }
}

const reducer = ({ initState, actionHandlers = {}, children = {} }) => {
  const reduceChildren = combineReducers(children)
  let nextState

  const result = (state, action) => {
    if (state === undefined) return { ...reduceChildren(), ...initState }

    nextState = reduceChildren(state, action)
    const reduce = actionHandlers[action.type]
    if (reduce) reduce(nextState, action, state)
    return nextState
  }

  // Handles the given action.
  result.reduce = (action) => {
    Object.assign(nextState, result(nextState, action))
  }

  // Makes a child handle the given action.
  result.reduceChild = (child, action) => {
    const childName = _.findKey(children, (c) => c === child)
    nextState[childName] = child(nextState[childName], action)
  }

  return result
}

export default reducer

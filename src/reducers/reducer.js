import { _ } from '../utils'

// Line redux.combineReducers, except allows for additional fields on state that
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

const reducer = ({ init, actions = {}, children = {} }) => {
  const reduceChildren = combineReducers(children)

  return (state, action) => {
    if (state === undefined) return { ...reduceChildren(), ...init }

    let nextState = reduceChildren(state, action)
    const reduce = actions[action.type]
    if (reduce) nextState = reduce(nextState, action, state) || nextState
    return nextState
  }
}

export default reducer

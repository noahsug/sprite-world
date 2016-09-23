import { combineReducers } from 'redux'
import { _ } from '../utils'

const reduce = (init, reducerMap = {}, children = {}) => {
  const hasChildren = !_.isEmpty(children)
  const reduceChildren = hasChildren ? combineReducers(children) : () => ({})

  return (state, action) => {
    if (state === undefined) return { ...reduceChildren(), ...init }
    const reducer = reducerMap[action.type]
    if (!reducer && !hasChildren) return state
    const nextState = { ...state, ...reduceChildren(state, action) }
    if (reducer) reducer(nextState, action, state)
    return nextState
  }
}

export default reduce

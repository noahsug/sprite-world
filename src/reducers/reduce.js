const reduce = (init, reducerMap) => (state, action) => {
  if (state === undefined) return init
  const reducer = reducerMap[action.type]
  if (!reducer) return state
  return { ...state, ...reducer(state, action) }
}

export default reduce

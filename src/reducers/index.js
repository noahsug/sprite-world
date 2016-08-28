export default (state, action) => {
  if (state === undefined) {
    return {
      solving: false,
      result: undefined,
    }
  }

  switch (action.type) {
    case 'SOLVE':
      return {
        ...state,
        solving: true,
      }

    case 'UPDATE':
      return {
        ...state,
        result: action.result,
      }

    case 'CANCEL':
      return {
        ...state,
        solving: false,
        result: undefined,
      }

    case 'FINISH':
      return {
        ...state,
        solving: false,
      }

    default:
      return state
  }
}

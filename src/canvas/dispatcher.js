export default class Dispatcher {
  setReducer(reducer) {
    this.reducer = reducer
  }

  getDispatch() {
    return this.dispatch.bind(this)
  }

  dispatch(type, data) {
    this.reducer.reduce(type, data)
  }
}

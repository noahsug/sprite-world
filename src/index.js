import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
// import { canvasAppSaga } from './sagas'
import App from './containers/App'

window.document.addEventListener('DOMContentLoaded', () => {
  // const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducers,
    // applyMiddleware(sagaMiddleware)
  )

  // sagaMiddleware.run(canvasAppSaga, canvasApp)

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
})

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import { canvasAppSaga } from './sagas'
import AppContainer from './containers/AppContainer'
import { CanvasApp } from './lib'

window.document.addEventListener('DOMContentLoaded', () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
  )

  const canvasApp = new CanvasApp()
  canvasApp.init(document.getElementById('fg'))
  sagaMiddleware.run(canvasAppSaga, canvasApp)

  render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
  )
})

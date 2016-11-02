import React from 'react'
import { render } from 'react-dom'
import hot from 'react-hot-loader'
const HotAppContainer = hot.AppContainer
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import { canvasSaga, keyboardInputSaga } from './sagas'
import AppContainer from './containers/AppContainer'
import { createCanvasApp } from './canvas'

window.document.addEventListener('DOMContentLoaded', () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
  )

  const root = document.getElementById('root')
  const canvasApp = createCanvasApp(document.body);

  sagaMiddleware.run(canvasSaga, canvasApp)
  sagaMiddleware.run(keyboardInputSaga, canvasApp)

  const renderApp = (Component = AppContainer) => {
    render(
      <HotAppContainer>
        <Provider store={store}>
          <Component />
        </Provider>
      </HotAppContainer>,
      root
    )
  }

  // Enable hot reload by react-hot-loader.
  if (module.hot) {
    const rerenderApp = () => {
      try {
        renderApp()
      } catch (error) {
        const RedBox = require('redbox-react')

        render(<RedBox error={error} />, root)
      }
    }

    module.hot.accept('./containers/AppContainer', () => {
      const NextAppContainer = require('./containers/AppContainer')

      rerenderApp(NextAppContainer)
    })

    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')

      store.replaceReducer(nextReducer)
    })
  }

  renderApp()
})

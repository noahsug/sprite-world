import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import hot from 'react-hot-loader'
const HotAppContainer = hot.AppContainer
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import { keyboardInput, runner } from './sagas'
import AppContainer from './containers/AppContainer'

window.document.addEventListener('DOMContentLoaded', () => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(keyboardInput)
  sagaMiddleware.run(runner)

  const root = document.getElementById('root')

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

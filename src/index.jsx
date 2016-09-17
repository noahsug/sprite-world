import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
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

  const root = document.getElementById('root')

  const renderApp = (Component = App) => {
    render(
      <AppContainer>
        <Provider store={store}>
          <Component />
        </Provider>
      </AppContainer>,
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

    module.hot.accept('./containers/App', () => {
      // Prevent the hot reloading error from react-router
      // unmountComponentAtNode(root)
      const NextApp = require('./containers/App')

      rerenderApp(NextApp)
    })

    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')

      store.replaceReducer(nextReducer)
    })
  }

  renderApp()
})

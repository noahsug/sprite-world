import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import AppContainer from '../AppContainer'
import reducers from '../../reducers'

describe('app', () => {
  let app
  beforeEach(() => {
    const store = createStore(reducers)
    app = shallow(
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  })

  it('renders', () => {
    expect(app.find('App')).toBeDefined()
  })
})

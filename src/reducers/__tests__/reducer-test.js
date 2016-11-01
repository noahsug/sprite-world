import reduceAppState from '../index'
import { setHealth } from '../../actions'

describe('app reducer', () => {
  let state

  function reduce(action) {
    state = reduceAppState(state, action)
  }

  beforeEach(() => {
    state = reduceAppState()
  })

  it('returns initial state', () => {
    expect(state.health).toBe(0)
  })

  it('sets health', () => {
    reduce(setHealth(10))
    expect(state.health).toBe(10)
  })
})

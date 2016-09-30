import reducer from '../'
import { nextLevel, addLetter, removeLetter, playWord } from '../../actions'

describe('reducer', () => {
  let state

  function reduce(action) {
    state = reducer(state, action)
  }

  beforeEach(() => {
    state = reducer()
  })

  it('returns initial state', () => {
    expect(state.letters.length).toBe(4)
    expect(state.played).toEqual([])
    expect(state.level).toBe(-1)
  })

  it('moves to the next level', () => {
    reduce(nextLevel())
    expect(state.level).toBe(0)
    expect(state.played).toEqual([])
  })

  it('adds a letter', () => {
    reduce(nextLevel())
    reduce(addLetter(0))
    expect(state.played).toEqual([0])
    reduce(addLetter(2))
    expect(state.played).toEqual([0, 2])
  })

  it('removes a letter', () => {
    reduce(nextLevel())
    reduce(addLetter(0))
    reduce(addLetter(2))
    reduce(removeLetter(1))
    expect(state.played).toEqual([0])
  })

  it('plays a word', () => {
    reduce(nextLevel())
    const startingAp = state.ap.current
    reduce(addLetter(0))
    reduce(addLetter(2))
    reduce(playWord())
    expect(state.played).toEqual([])
    expect(state.ap.current).toBe(startingAp - 2)
  })
})

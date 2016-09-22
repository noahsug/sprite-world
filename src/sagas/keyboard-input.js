import { call, select } from 'redux-saga/effects'
import putp from './putp'
import { getLetters } from '../selectors'

const matchesEvent = (e, keyCodeOrRegex, modifier) => {
  if (typeof keyCodeOrRegex === 'object') {
    return e.key.match(keyCodeOrRegex)
  }
  return e.key === keyCodeOrRegex && (!modifier || e[modifier])
}

const awaitKeyDown = (keyCodeOrRegex, modifier) => {
  return new Promise((resolve) => {
    const handleEvent = (e) => {
      if (matchesEvent(e, keyCodeOrRegex, modifier)) {
        window.removeEventListener('keydown', handleEvent)
        resolve(e)
      }
    }
    window.addEventListener('keydown', handleEvent)
  })
}

/**
 * 1-4: Add letter
 * 5-8: Remove letter
 */
export default function* keyboardInput() {
  while (true) {
    const { key } = yield call(awaitKeyDown, /[0-8]/)
    const input = Number(key)
    if (input >= 1 && input <= 4) {
      const letters = yield select(getLetters)
      yield putp('ADD_LETTER', letters[input - 1])
    } else {
      yield putp('REMOVE_LETTER', input - 5)
    }
  }
}

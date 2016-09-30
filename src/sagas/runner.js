import { delay } from 'redux-saga'
import { call, select } from 'redux-saga/effects'
import { isLevelOver } from '../selectors'
import putp from './putp'

// Milliseconds between game updates.
const UPDATE_TIME = 100

export default function* runner() {
  yield putp('NEXT_LEVEL')

  let tickCount = 0
  while (true) {
    yield call(delay, UPDATE_TIME)
    tickCount++
    yield putp('TICK', tickCount)

    if (yield select(isLevelOver)) {
      yield putp('NEXT_LEVEL')
    }
  }
}

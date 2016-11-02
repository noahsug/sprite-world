import { call } from 'redux-saga/effects'
import putp from './putp'
import { awaitKeyDown } from './keyboard'

export default function* keyboardInput() {
  while (true) {
    const { key } = yield call(awaitKeyDown, /[1-2]/)
    yield putp('USE_ABILITY', Number(key) - 1)
  }
}

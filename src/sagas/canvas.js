import { call } from 'redux-saga/effects'
import putp from './putp'

export default function* canvasSaga(canvasApp) {
  while (true) {
    const state = yield call(canvasApp.getState)
    yield putp('SET_HEALTH', state.player.health)
  }
}

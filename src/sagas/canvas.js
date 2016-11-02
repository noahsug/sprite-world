import { call, fork, take } from 'redux-saga/effects'
import putp from './putp'

function* sendEvents(canvasApp) {
  while (true) {
    const { ability } = yield take('USE_ABILITY')
    canvasApp.useAbility(ability)
  }
}

function* observeState(canvasApp) {
  while (true) {
    const state = yield call(canvasApp.getState)
    yield putp('SET_HEALTH', state.player.health)
  }
}

export default function* canvasSaga(canvasApp) {
  yield fork(sendEvents, canvasApp)
  yield fork(observeState, canvasApp)
}

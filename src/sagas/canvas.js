import { call, fork, take } from 'redux-saga/effects'
import putp from './putp'

function* sendUseAbilityEvents(canvasApp) {
  while (true) {
    const { ability } = yield take('USE_ABILITY')
    canvasApp.useAbility(ability)
  }
}

function* sendStartAbilityEvents(canvasApp) {
  while (true) {
    const { ability } = yield take('START_ABILITY')
    canvasApp.startAbility(ability)
  }
}

function* observeState(canvasApp) {
  while (true) {
    const state = yield call(canvasApp.getState)
    yield putp('SET_HEALTH', state.player.health)
  }
}

export default function* canvasSaga(canvasApp) {
  yield fork(sendUseAbilityEvents, canvasApp)
  yield fork(sendStartAbilityEvents, canvasApp)
  yield fork(observeState, canvasApp)
}

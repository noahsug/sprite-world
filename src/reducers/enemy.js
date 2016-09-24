import reducer from './reducer'
import ap from './ap'

export default reducer({
  initState: {
    number: 0,
    played: [],
  },
  actionHandlers: {
    SET_ENEMY: (nextState, action) => {
      nextState.number = action.enemy.number
    }
  },
  children: { ap },
})

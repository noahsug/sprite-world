import reducer from './reducer'

export default reducer({
  initState: {
    text: 'Some awesome text will go here. It will explain the rules, etc.',
    level: -1,
  },
  actionHandlers: {
    NEXT_ENEMY: (nextState) => {
      nextState.level += 1
    },
  },
})

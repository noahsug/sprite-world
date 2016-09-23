import reducer from './reducer'
import ap from './ap'

export default reducer({
  init: {
    number: 0,
    played: [],
  },
  children: { ap },
})

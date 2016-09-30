import { _ } from '../../utils'

const enemies = _.range(0, 99).map(i => ({
  attacks: [
    {
      word: 'Black',
      effect: { body: -2 + i },
    }, {
      word: 'as',
      effect: {},
    }, {
      word: 'the',
      effect: {},
    }, {
      word: 'devil,',
      effect: { body: -4 + i },
    }, {
      word: 'hot',
      effect: { body: -1 + i },
    }, {
      word: 'as',
      effect: {},
    }, {
      word: 'hell.',
      effect: { body: -3 + i },
    },
  ],
}))

export default {
  enemies,
}

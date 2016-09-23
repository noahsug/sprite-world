import dictionary from '../'

describe('dictionary', () => {
  describe('match', () => {
    it('can determine if a prefix is valid', () => {
      const match = dictionary.match('za')
      expect(match.isPrefix).toBe(true)

      const badMatch = dictionary.match('zz')
      expect(badMatch.isPrefix).toBe(false)
    })

    it('can determine if a prefix is a word', () => {
      const match = dictionary.match('zap')
      expect(match.isWord).toBe(true)

      const badMatch = dictionary.match('zapz')
      expect(badMatch.isWord).toBe(false)
    })
  })
})

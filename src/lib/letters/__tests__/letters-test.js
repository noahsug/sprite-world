import { createLetter } from '../'

describe('letters', () => {
  it('can be created', () => {
    const letter = createLetter('A')
    expect(letter.letter).toBe('A')
    expect(letter.effect).toBeDefined()
    expect(letter.ap).toBe(1)
  })
})

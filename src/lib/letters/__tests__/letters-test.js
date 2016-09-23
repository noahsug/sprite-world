import { createLetter } from '../'

describe('letters', () => {
  it('can be created', () => {
    const letter = createLetter('A')
    expect(letter.letter).toBe('A')
    expect(letter.dmg).toBe(1)
    expect(letter.ap).toBe(1)
  })
})

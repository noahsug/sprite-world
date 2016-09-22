// jest.unmock('../stats-decorator')
//
// import stats from '../stats-decorator'
//
// @stats('health', 'speed')
// class Dog {}
//
// describe('stats decorator', () => {
//  let dog
//
//  beforeEach(() => {
//    dog = new Dog()
//  })
//
//  it('provides baseStat and stat, initialized to 0', () => {
//    expect(dog.health).toBe(0)
//    expect(dog.baseHealth).toBe(0)
//
//    dog.health += 5
//    expect(dog.health).toBe(5)
//  })
//
//  it('sets base stat when stat is first set', () => {
//    dog.health = 5
//    expect(dog.health).toBe(5)
//    expect(dog.baseHealth).toBe(5)
//  })
//
//  it('allows for multiple stats to be defined at once', () => {
//    expect(dog.health).toBeDefined()
//    expect(dog.speed).toBeDefined()
//  })
// })

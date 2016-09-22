// jest.unmock('../__testdata__/test-data')
//
// import testData from '../__testdata__/test-data'
//
// describe('player', () => {
//  let hero
//  let enemy
//
//  beforeEach(() => {
//    hero = testData.createHero()
//    enemy = testData.createEnemy()
//  })
//
//  it('can be created', () => {
//    expect(hero.name).toBe('hero')
//    expect(hero.items.length).toBe(2)
//    expect(hero.items[0].ability.name).toBe('scratch')
//    expect(hero.items[0].ability.ap).toBe(3)
//    expect(hero.items[1].ability.name).toBe('wack')
//    expect(hero.items[1].ability.ap).toBe(2)
//    expect(hero.ap).toBe(5)
//    expect(hero.health).toBe(5)
//    expect(hero.speed).toBe(5)
//  })
//
//  it('can use abilities', () => {
//    hero.useAbility(enemy)
//    expect(hero.ap).toEqual(2)
//    expect(enemy.health).toEqual(1)
//  })
//
//  it('knows if an ability can be used', () => {
//    expect(hero.canUseAbility()).toBe(true)
//    hero.ap -= 4
//    expect(hero.canUseAbility()).toBe(false)
//  })
// })

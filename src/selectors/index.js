export const getLetters = state => state.hero.letters

export const isEnemyDead = state => {
  const enemyAp = state.enemy.ap
  return enemyAp.dmg >= enemyAp.max
}

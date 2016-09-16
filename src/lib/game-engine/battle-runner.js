export default class BattleRunner {
  battle(hero, enemy) {
    this.hero = hero
    this.enemy = enemy
  }

  nextAbility() {
    const player = this.getNextPlayer()
    const target = player === this.hero ? this.enemy : this.hero
    player.useAbility(target)
    const roundOver = this.maybeEndRound()
    const battleOver = this.maybeEndBattle()
    return { player, target, roundOver, battleOver }
  }

  getNextPlayer() {
    // If only one player has a valid ability, they go first.
    const heroCanAttack = this.hero.canUseAbility()
    const enemyCanAttack = this.enemy.canUseAbility()
    if (heroCanAttack && !enemyCanAttack) return this.hero
    if (!heroCanAttack && enemyCanAttack) return this.enemy

    // Player whose spent the least AP goes first.
    const heroAp = this.hero.ap.delta
    const enemyAp = this.enemy.ap.delta
    if (heroAp > enemyAp) return this.hero
    if (heroAp < enemyAp) return this.enemy

    // Break ties with speed.
    if (this.hero.speed.current > this.enemy.speed.current) return this.hero
    if (this.hero.speed.current < this.enemy.speed.current) return this.enemy

    // Choose randomly.
    return Math.random() < 0.5 ? this.hero : this.enemy
  }

  maybeEndRound() {
    if (!this.isRoundOver()) return false
    this.hero.endRound()
    this.enemy.endRound()
    return true
  }

  isRoundOver() {
    return !this.hero.canUseAbility() && !this.enemy.canUseAbility()
  }

  maybeEndBattle() {
    if (!this.isBattleOver()) return false
    this.hero.endBattle()
    this.enemy.endBattle()
    return true
  }

  isBattleOver() {
    return this.hero.dead || this.enemy.dead
  }
}

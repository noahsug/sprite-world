import stats from './stats-decorator'

@stats('health', 'speed', 'ap')
export default class Player {
  constructor() {
    this.name = ''
    this.items = []
    this.itemIndex = 0
  }

  canUseAbility() {
    return this.itemIndex < this.items.length && this.ap >= this.item.ability.ap
  }

  useAbility(target) {
    this.ap -= this.item.ability.ap
    this.item.ability.use(this, target)
    this.itemIndex++
  }

  get item() {
    return this.items[this.itemIndex]
  }

  get dead() {
    return this.health <= 0
  }

  endRound() {
    this.ap += this.ap.base
    this.abilityIndex = 0
  }

  endBattle() {
    this.health = this.baseHealth
    this.speed = this.baseSpeed
    this.ap = this.baseAp
  }
}

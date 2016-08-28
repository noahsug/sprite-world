import Entity from './entity'

export default class GameLogic {
  init(state) {
    const bob = new Entity()
    bob.behavior.movement = { angle: 0, speed: 50 }
    state.entities.push(bob)
  }

  update(state, dt) {
    const bob = state.entities[0]
    const m = bob.behavior.movement
    m.speed += 100 * (2 * Math.random() - 1) * dt
    m.angle += Math.PI * 8 * (2 * Math.random() - 1) * dt
    bob.x += m.speed * Math.cos(m.angle) * dt
    bob.y += m.speed * Math.sin(m.angle) * dt
  }
}

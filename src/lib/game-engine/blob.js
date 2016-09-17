import { Shape, Point, Path } from 'paper/dist/paper-core'
import { view } from 'paper/dist/paper-core'
import Entity from './entity'

export default class Blob extends Entity {
  constructor() {
    super()
    this.nextThink = 0
    this.thinkRate = 2
    this.accelerationDecision = new Point()

    this.radius = 6.5
    this.acceleration = new Point()
    this.maxSpeed = 300
    this.maxForce = 30
    this.minForce = 15
    this.position = view.center.clone()
    this.velocity = Point.random().multiply(2).subtract(1)

    this.head = new Shape.Ellipse({
      center: [0, 0],
      size: [Math.round(this.radius * 2), Math.round(this.radius / 1.25)],
      fillColor: 'white',
    })

    this.moveHead()
  }

  setTarget(e) {
    this.target = e
  }

  update(e) {
    this.acceleration = new Point()
    this.applyBoundries()
    this.think(e.time)
    this.move(e.delta)
  }

  applyBoundries() {
    let force = new Point()
    const r = this.radius * 5
    const { width, height } = view.size
    if (this.position.x < r) force.x = 1
    if (this.position.y < r) force.y = 1
    if (this.position.x > width - r) force.x = -1
    if (this.position.y > height - r) force.y = -1
    if (force.isZero()) return
    force = force.multiply(this.maxForce * 10)
    this.applyForce(force)
  }

  think(elapsed) {
    if (elapsed >= this.nextThink) {
      this.accelerationDecision = new Point({
        length: this.maxForce * (2 * Math.random() - 1),
        angle: 360 * Math.random() - 180,
      })
      if (this.accelerationDecision.length < this.minForce) {
        this.accelerationDecision.length = this.minForce
      }
      this.nextThink = elapsed + this.thinkRate * (0.5 + 0.5 * Math.random())
    }
    this.applyForce(this.accelerationDecision)
  }

  applyForce(force) {
    this.acceleration = this.acceleration.add(force)
  }

  move(dt) {
    this.velocity = this.velocity.add(this.acceleration.multiply(dt))
    this.velocity.length = Math.min(this.maxSpeed, this.velocity.length)
    this.velocity.length = Math.max(5, this.velocity.length)
    this.position = this.position.add(this.velocity.multiply(dt))
    this.moveHead()
  }

  moveHead() {
    this.head.position = this.position
    this.head.rotation = this.velocity.angle
  }
}

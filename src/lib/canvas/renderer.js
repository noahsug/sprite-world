import canvas, { ctx } from './canvas'

export default class Renderer {
  init(state) {
    canvas.init()
  }

  render(state, dt) {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const cx = canvas.width / 2
    const cy = canvas.height / 2

    const bob = state.entities[0]
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3
    this.rect_(cx + bob.x, cy + bob.y, 20, 20)
    ctx.stroke()
  }

  rect_(cx, cy, width, height) {
    ctx.beginPath()
    ctx.moveTo(cx - width / 2, cy - height / 2)
    ctx.lineTo(cx + width / 2, cy - height / 2)
    ctx.lineTo(cx + width / 2, cy + height / 2)
    ctx.lineTo(cx - width / 2, cy + height / 2)
    ctx.closePath()
  }
}

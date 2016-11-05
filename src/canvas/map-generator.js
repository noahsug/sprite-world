import { _ } from '../utils'

export default class MapGenerator {
  generate(width, height) {
    const map = {}
    for (let y = -1; y <= height; y++) {
      const yHash = y << 15
      for (let x = -1; x <= width; x++) {
        const fg = this.getFg(x, y, width, height)
        const bg = this.getBg(x, y, width, height)
        map[yHash + x] = {
          bg,
          fg,
          entity: null,
        }
      }
    }
    return map
  }

  getBg(x, y) {
    const values = [14, 15, 14 + 20, 15 + 20]
    return _.sample(values)
  }

  getFg(x, y, width, height) {
    // Surround the level with rocks.
    if (x === -1 || y === -1 ||
        x === width || y == height) {
      return this.getRockTile()
    }

    // Ensure player can move at the start.
    if ((x === 0 && y === 0) || (x === 0 && y === 1) || (x === 1 && y === 0)) {
      return undefined
    }

    // Randomly spawn rocks.
    if (Math.random() < 0.1) {
      return this.getRockTile()
    }
    return undefined
  }

  getRockTile() {
    return 17 + 20 * 4
  }
}

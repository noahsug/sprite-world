import { _ } from '../utils'

const SIZE = 100

export default class MapGenerator {
  // Generates and adds a 100x100 tile block to the map.
  generate() {
    const map = {}
    for (let y = -SIZE; y < SIZE; y++) {
      const yHash = y << 15
      for (let x = -SIZE; x < SIZE; x++) {
        const fg = this.getFg(x, y)
        const bg = this.getBg(x, y)
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

  getFg(x, y) {
    if ((x === 0 && y === 0) || (x === 0 && y === 1) || (x === 1 && y === 0)) {
      return undefined
    }
    if (Math.random() < 0.1) {
      return this.getRockTile()
    }
    return undefined
  }

  getRockTile() {
    return 17 + 20 * 4
  }
}

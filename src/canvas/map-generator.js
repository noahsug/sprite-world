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
          bg: bg.tile,
          fg: fg.tile,
          entity: null,
        }
      }
    }
    return map
  }

  getBg(x, y) {
    const values = [14, 15, 14 + 20, 15 + 20]
    return { tile: _.sample(values) }
  }

  getFg(x, y) {
    if ((x === 0 && y === 0) || (x === 0 && y === 1) || (x === 1 && y === 0)) {
      return {}
    }
    if (Math.random() < 0.1) {
      return { tile: 17 + 20 * 4 }
    }
    return {}
  }
}

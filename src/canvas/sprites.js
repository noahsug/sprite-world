export default {
  'goblin': {
    width: 52,
    height: 52,
    offset: { x: -10 + 52 / 2, y: -18 },
    right: {
      attack: { row: 0, length: 3 },
      walk: { row: 1, length: 3 },
      idle: { row: 2, length: 2 },
    },
    up: {
      attack: { row: 3, length: 3 },
      walk: { row: 4, length: 4 },
      idle: { row: 5, length: 2 },
    },
    down: {
      attack: { row: 6, length: 3 },
      walk: { row: 7, length: 4 },
      idle: { row: 8, length: 2 },
    },
    speed: {
      attack: 60,
      walk: 100 * 180,
      idle: 600,
    },
  },
  'snake': {
    width: 56,
    height: 56,
    offset: { x: -12 + 56 / 2, y: -20 },
    right: {
      attack: { row: 0, length: 5 },
      walk: { row: 1, length: 4 },
      idle: { row: 2, length: 4 },
    },
    up: {
      attack: { row: 3, length: 5 },
      walk: { row: 4, length: 4 },
      idle: { row: 5, length: 4 },
    },
    down: {
      attack: { row: 6, length: 5 },
      walk: { row: 7, length: 4 },
      idle: { row: 8, length: 6 },
    },
    speed: {
      attack: 40,
      walk: 100 * 180,
      idle: 250,
    },
  },
}

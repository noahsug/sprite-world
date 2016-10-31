export const Direction = {
  right: { x: 1, y: 0, name: 'right', right: true },
  left: { x: -1, y: 0, name: 'left', left: true },
  down: { x: 0, y: 1, name: 'down', down: true },
  up: { x: 0, y: -1, name: 'up', up: true },
}

Direction.get = (x, y) => {
  if (x > 0) return Direction.right
  if (x < 0) return Direction.left
  if (y > 0) return Direction.down
  if (y < 0) return Direction.up
  return null
}

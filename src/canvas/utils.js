export function valueToDirection(xdir, ydir) {
  if (xdir > 0) return 'right'
  if (xdir < 0) return 'left'
  if (ydir > 0) return 'down'
  if (ydir < 0) return 'up'
  return ''
}

export function directionToValue(direction) {
  if (direction === 'up') return { xdir: 0, ydir: -1 }
  if (direction === 'down') return { xdir: 0, ydir: 1 }
  if (direction === 'left') return { xdir: -1, ydir: 0 }
  if (direction === 'right') return { xdir: 1, ydir: 0 }
  return { xdir: 0, ydir: 0 }
}

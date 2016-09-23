const enemies = _.range(1, 100).map(i => ({
  number: i,
  ap: 3 + Math.floor(Math.sqrt(i)),
}))

export default {
  enemies,
}

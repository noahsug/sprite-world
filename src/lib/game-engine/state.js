export default class State {
  constructor() {
    this.entities = []
  }

  add(entity) {
    this.entities.push(entity)
  }

  get numEntities() {
    return this.entities.length
  }
}

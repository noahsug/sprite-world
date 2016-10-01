class Resource {
  constructor({ max, current }) {
    this.max = max
    this.current = current
  }

  init(value) {
    return new Resource
  }
}

export default {
  create: () => new Resource()
}

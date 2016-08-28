class Canvas {
  init() {
    this.dom = window.document.getElementById('fg')
    this.ctx = this.dom.getContext('2d')
    this.fullScreen()
    this.width = this.dom.width
    this.height = this.dom.height
  }

  fullScreen() {
    this.dom.width = window.innerWidth
    this.dom.height = window.innerHeight
  }
}

export default new Canvas()

import { inject } from 'aurelia-dependency-injection'
import { RenderTexture, Container } from 'pixi.js'
import su from '../lib/sprite-utilities'
import { _ } from '../utils'

import Renderer from './renderer'
import Stage from './stage'
import Assets from './assets'
import MapGenerator from './map-generator'
import { UNIT } from './world'

const BUFFER = 0

@inject(Stage, Assets, MapGenerator, Renderer)
export default class Map {
  constructor(stage, assets, generator, renderer) {
    this.stage = stage
    this.assets = assets
    this.generator = generator
    this.renderer = renderer

    this.tileFrames = []
    this.data = {}
    this.sprite = null
  }

  generate() {
    this.tileFrames = this.getTileFrames()
    this.data = this.generator.generate()

    const container = new Container()
    for (let y = -BUFFER; y < this.renderer.height / UNIT; y++) {
      const yHash = y << 15
      for (let x = -BUFFER; x < this.renderer.width / UNIT; x++) {
        const tiles = this.data[yHash + x]
        container.addChild(this.getTileSprite(tiles.bg, x, y))
        if (tiles.fg) container.addChild(this.getTileSprite(tiles.fg, x, y))
      }
    }

    const bgTexture = RenderTexture.create(
        this.renderer.width + BUFFER * UNIT,
        this.renderer.height + BUFFER * UNIT)
    this.renderer.render(container, bgTexture)
    this.sprite = su.sprite(bgTexture)
    this.sprite.x -= BUFFER * UNIT
    this.sprite.y -= BUFFER * UNIT
    this.stage.add(this.sprite)
  }

  getTileFrames() {
    const {width, height} = this.assets.texture('tilesheet').baseTexture
    const framePos = []
    for (let y = 0; y < height; y += 32) {
      for (let x = 0; x < width; x += 32) {
        framePos.push([x, y])
      }
    }
    return su.frames(this.assets.path('tilesheet'), framePos, 32, 32)
  }

  getTileSprite(tileIndex, x, y) {
    const tile = su.sprite(this.tileFrames[tileIndex])
    tile.x = (x + BUFFER) * UNIT
    tile.y = (y + BUFFER) * UNIT
    return tile
  }

  collides(x, y) {
    const tile = this.data[(y << 15) + x]
    return tile.collision
  }

  update() {
  }
}

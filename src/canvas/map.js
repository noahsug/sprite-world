import { inject } from 'aurelia-dependency-injection'
import { RenderTexture, Container } from 'pixi.js'
import su from '../lib/sprite-utilities'
import { _ } from '../utils'

import Renderer from './renderer'
import Stage from './stage'
import Assets from './assets'
import MapGenerator from './map-generator'
import World, { UNIT } from './world'

const BUFFER = 0

@inject(Stage, Assets, MapGenerator, Renderer, World)
export default class Map {
  constructor(stage, assets, generator, renderer, world) {
    this.world = world
    this.stage = stage
    this.assets = assets
    this.generator = generator
    this.renderer = renderer

    this.tileFrames = []
    this.data = {}
    this.container = null
    this.sprite = null
  }

  generate() {
    this.tileFrames = this.getTileFrames()
    this.data = this.generator.generate()

    this.container = new Container()
    for (let y = -BUFFER; y < this.renderer.height / UNIT; y++) {
      const yHash = y << 15
      for (let x = -BUFFER; x < this.renderer.width / UNIT; x++) {
        const tiles = this.data[yHash + x]
        this.container.addChild(this.getTileSprite(tiles.bg, x, y))
        if (tiles.fg) {
          this.container.addChild(this.getTileSprite(tiles.fg, x, y))
        }
      }
    }

    const bgTexture = RenderTexture.create(
        this.renderer.width + BUFFER * UNIT,
        this.renderer.height + BUFFER * UNIT)
    this.renderer.render(this.container, bgTexture)
    this.sprite = su.sprite(bgTexture)
    this.sprite.x -= BUFFER * UNIT
    this.sprite.y -= BUFFER * UNIT
    this.sprite.z = -1
    this.stage.add(this.sprite)
  }

  placeRock(x, y) {
    const rock = this.generator.getRockTile()
    this.get(x, y).fg = rock
    this.container.addChild(this.getTileSprite(rock, x, y))
    this.redraw()
  }

  getTileFrames() {
    const { width, height } = this.assets.texture('tilesheet').baseTexture
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

  entityCollides(entity, x, y) {
    const obj = this.collides(x, y)
    if (entity === obj) return false
    return obj
  }

  collides(x, y) {
    const tile = this.data[(y << 15) + x]
    if (tile.entity) return tile.entity
    if (tile.fg) return tile.fg
    return false
  }

  get(x, y) {
    return this.data[(y << 15) + x]
  }

  update() {
    const len = this.world.entities.length
    for (let i = 0; i < len; i++) {
      const entity = this.world.entities[i]
      const tile = this.data[(entity.y << 15) + entity.x]
      if (entity.tile) {
        if (entity.tile === tile) continue
        if (entity.tile.entity === entity) entity.tile.entity = null
      }
      entity.tile = tile
      tile.entity = entity
    }
  }

  redraw() {
    const bgTexture = RenderTexture.create(
        this.renderer.width + BUFFER * UNIT,
        this.renderer.height + BUFFER * UNIT)
    this.renderer.render(this.container, bgTexture)
    this.sprite.texture = bgTexture
  }
}

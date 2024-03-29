// app/models/Rectangle.ts

import ShapeInterface from "./ShapeInterface"

export default class Rectangle implements ShapeInterface {
  _properties: {
    width: number,
    height: number,
    type: 'rectangle'
  }

  constructor(options: {width: number, height: number}) {
    this._properties = {
      width: options.width,
      height: options.height,
      type: 'rectangle'
    }
  }

  get properties() { 
    return this._properties
  }

  set properties(properties: {
    width: number,
    height: number
    type: 'rectangle'
  }) {
    this._properties = properties
  }

  checkClick(coords: {x: number, y: number}): Boolean {
    if (coords.x < 0 || coords.y < 0) {
      return false
    }

    const width = this.properties.width
    const height = this.properties.height

    if (coords.x > width || coords.y > height) {
      return false
    }

    return true
  }
}

// app/models/Circle.ts

import CoordinatesType from "../../types/CoordinatesType"
import ShapeInterface from "./ShapeInterface"

export default class Circle implements ShapeInterface {
  _properties: {
    radius: number,
    type: 'circle'
  }

  constructor(options: {radius: number}) {
    this._properties = {
      radius: options.radius,
      type: 'circle'
    }
  }

  get properties() { 
    return this._properties
  }

  set properties(properties: {radius: number, type: 'circle'}) {
    this._properties = properties
  }

  checkClick(coords: CoordinatesType): Boolean {
    const dx = Math.abs(coords.x)
    const dy = Math.abs(coords.y)
    const radius = this.properties.radius
    const distanceSquared = dx * dx + dy * dy

    if (distanceSquared <= radius * radius) {
      return true
    }

    return false
  }
}

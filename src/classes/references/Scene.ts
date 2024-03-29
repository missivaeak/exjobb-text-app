// app/models/Scene.ts

import Reference from "./Reference"
import ReferenceOptions from "./ReferenceOptions"
import Region from "./Region"
import Picture from "../Picture"

export default class Scene extends Reference {
  private _regions: Array<Region>
  private _picture: Picture

  constructor(options: ReferenceOptions, databaseId: number, picture: Picture) {
    super(options, databaseId)
    this._picture = picture
    this._regions = []
  }

  get picture(): Picture {
    return this._picture
  }

  set picture(picture: Picture) {
    this._picture = picture
  }

  get regions(): Array<Region> {
    return this._regions
  }

  addRegion(region: Region) {
    this._regions.push(region)
  }

  removeRegion(region: Region) {
    for (const index of this._regions.keys()) {
      if (this._regions[index] === region) {
        this._regions.splice(index, 1)
        return
      }
    }
  }

  removeRegionByIndex(index: number) {
    const region = this._regions.splice(index, 1)[0]

    return region
  }

  removeAllRegions() {
    this._regions = []
  }
}

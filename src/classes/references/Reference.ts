// app/models/Reference.ts

import Database from "../../services/Database"
import Container from "./Container"
import ReferenceOptions from "./ReferenceOptions"

export default abstract class Reference {
  private _type: string
  private _name: string
  private _description: string
  private _databaseId: number
  private _parent: Reference | undefined

  constructor(options: ReferenceOptions, databaseId: number) {
    this._type = options.type
    this._name = options.name
    this._description = options.description
    this._databaseId = databaseId
    this._parent = options.parent
  }

  get type() {
      return this._type
  }

  set type(type: string) {
      this._type = type
  }

  get name() {
      return this._name
  }

  set name(name: string) {
      this._name = name
  }

  get description() {
      return this._description
  }

  set description(description: string) {
      this._description = description
  }

  get databaseId() {
      return this._databaseId
  }

  async fetchParent(db: Database) {
    this._parent = await db.getParentOf(this)
  }

  get parent() {
    return this._parent
  }
}

// app/models/Picture.ts
// import EnvVars from "../constants/EnvVars"
// import RNFetchBlob from 'react-native-blob-util'

export default class Picture {
  private _format: string
  private _source: string
  private _databaseId: number

  constructor(source: string, databaseId: number, format="") {
    this._source = source
    this._databaseId = databaseId
    this._format = format
  }

  async destroy() {
    // const path = EnvVars.baseDir + this._source
    // let exists: boolean

    // exists = await RNFetchBlob.fs.exists(path)

    // if (!exists) {
    //   throw new Error(`Photo destruction failed, file ${path} does not exist.`)
    // }

    // await RNFetchBlob.fs.unlink(path)

    // exists = await RNFetchBlob.fs.exists(path)

    // if (exists) {
    //   throw new Error('Photo destruction failed, file still exists.')
    // }
  }

  get source() {
    return this._source
  }

  set source(source: string) {
    this._source = source
  }

  get format() {
    return this._format
  }

  set format(format: string) {
    this._format = format
  }

  get databaseId() {
    return this._databaseId
  }
}

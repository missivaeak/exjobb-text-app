// app/models/Sound.ts

import Reference from "./Reference"
import ReferenceOptions from "./ReferenceOptions"

export default class Sound extends Reference {
    private _format: string
    private _source: string

    constructor(options: ReferenceOptions, source: string, databaseId: number, format="") {
        super(options, databaseId)
        this._source = source
        this._format = format
    }

    get source() {
        return this._source
    }

    set source(source: string) {
        this._source = source
    }
}

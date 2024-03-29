// app/models/ReferenceOptions.ts

import Reference from './Reference'

export default interface ReferenceOptions {
    type: 'startingPoint' | 'folder' | 'place' | 'scene' | 'sound'
    name: string
    description: string
    parent?: Reference
}

import type { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack'

import type Container from '../classes/references/Container'
import type Scene from '../classes/references/Scene'
import type Picture from '../classes/Picture'

export type RootStackParamList = {
  Home: undefined
  Debug: undefined
  Gallery: undefined
  Audio: undefined
  Camera: undefined
  StartingPoint: undefined

  Folder: { folder: Container }
  EditFolder:{ folder: Container }

  Place: { place: Container }
  EditPlace: { place: Container}

  Scene: { scene: Scene }
  EditScene: { scene: Scene }

  SnapPicture: {
    targetType: 'place' | 'folder' | 'scene'
    parent: Container
  }
  ConfirmPicture: {
    targetType: 'place' | 'folder' | 'scene'
    picture: Picture
    parent: Container
  }

  Default: undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParamList {}
//   }
// }

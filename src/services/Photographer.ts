// import { type PhotoFile } from "react-native-vision-camera";
// import { CameraCapturedPicture } from 'expo-camera'
import * as FileSystem from 'expo-file-system'
// import RNFetchBlob from 'react-native-blob-util'
import EnvVars from "../constants/EnvVars"
import { Asset } from 'expo-asset'

export default class Photographer {
  static async save() {
    const [photo] = await Asset.loadAsync(require('../assets/camera.jpg'))
    console.log(photo.localUri)
    const now = new Date()
    const timestamp = now.getTime().toString()
    const filename = timestamp + '.jpg'

    // await RNFetchBlob.fs.cp(
    //   photo.uri,
    //   EnvVars.baseDir + filename
    //   )
    await FileSystem.copyAsync({
      from: photo.localUri,
      to: EnvVars.baseDir + filename
    })

    return filename
  }
}

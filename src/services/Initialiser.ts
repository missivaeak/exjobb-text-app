import Database from "./Database"
// import { Asset, useAssets } from "expo-asset"
// import RNFetchBlob from 'react-native-blob-util'

import EnvVars from "../constants/EnvVars"
// import Picture from "../classes/Picture"
// import RNFS from 'react-native-fs'
// import images from '../assets/index'

// default images
// const pictures = [
//   'house.png',
//   'city.png',
//   'hotel.png',
//   'school.png',
//   'shop.png',
// ]

// const [pictures, error] = useAssets([
//   require('')
// ])

export default class Initialiser {
  static async run(db: Database) {


    // for (let i = 0; i < pictures.length; i++) {
    //   const base64 = await RNFetchBlob.fs.readFile(
    //     `bundle-assets://${pictures[i]}`, 'base64'
    //     )
    //   await RNFetchBlob.fs.writeFile(EnvVars.bareBaseDir + pictures[i], base64, 'base64')
    //   await db.insertPicture(pictures[i], 'png')
    // }

    const picture = await db.insertPicture('dummy.png', 'png')
    await db.setStartingPointPicture(picture.databaseId)
    await db.setSetting("first_run", "false")

    const pictureObj = await db.getPictures()
    const startingPoint = await db.getStartingPoint()

    await db.addContainer({
      type: 'place',
      name: 'Hem',
      description: '',
      parent: startingPoint
    }, pictureObj[0])
  }
}
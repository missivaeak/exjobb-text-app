// import { Platform } from "react-native";
// import { 
//   check,
//   checkMultiple,
//   request,
//   requestMultiple,
//   PERMISSIONS,
//   RESULTS,
//   openSettings,
// } from "react-native-permissions";

// export default class Permitter {
//   static async checkStorage() {
//     // on non-android and android api version 33 and up permissions are not needed
//     if (Platform.OS !== 'android' || Platform.Version >= 33) {
//       return true
//     }

//     const permissions = [
//         PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//         PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//     ]
//     const result = await checkMultiple(permissions)

//     // if either is not granted return false
//     for (const permission of permissions) {
//       if (result[permission] !== RESULTS.GRANTED) {
//         return false
//       }
//     }

//     return true
//   }

//   static async checkMicrophone() {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.MICROPHONE,
//       android: PERMISSIONS.ANDROID.RECORD_AUDIO
//     })

//     // assume permission is true
//     if (!permission) {
//       return true
//     }

//     const result = await check(permission)

//     if (result !== RESULTS.GRANTED) {
//       return false
//     }

//     return true
//   }

//   static async checkCamera() {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.CAMERA,
//       android: PERMISSIONS.ANDROID.CAMERA
//     })

//     // assume permission is true
//     if (!permission) {
//       return true
//     }

//     const result = await check(permission)

//     if (result !== RESULTS.GRANTED) {
//       return false
//     }

//     return true
//   }

//   static async checkAll() {
//     const results = await Promise.all([
//       Permitter.checkStorage(),
//       Permitter.checkMicrophone(),
//       Permitter.checkCamera()
//     ])

//     for (const result of results) {
//       if (result === false) {
//         return false
//       }
//     }

//     return true
//   }

//   static async requestStorage() {
//     // on non-android and android api version 33 and up permissions are not needed
//     if (Platform.OS !== 'android' || Platform.Version >= 33) {
//       return true
//     }

//     const permissions = [
//         PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
//         PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//     ]
//     const result = await requestMultiple(permissions)

//     // if either is not granted return false
//     for (const permission of permissions) {
//       if (result[permission] === RESULTS.BLOCKED) {
//         await openSettings()
//       }

//       if (result[permission] !== RESULTS.GRANTED) {
//         return false
//       }
//     }

//     return true
//   }

//   static async requestMicrophone() {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.MICROPHONE,
//       android: PERMISSIONS.ANDROID.RECORD_AUDIO
//     })

//     // assume permission is true
//     if (!permission) {
//       return true
//     }

//     const result = await request(permission)

//     if (result === RESULTS.BLOCKED) {
//       await openSettings()
//     }

//     if (result !== RESULTS.GRANTED) {
//       return false
//     }

//     return true
//   }

//   static async requestCamera() {
//     const permission = Platform.select({
//       ios: PERMISSIONS.IOS.CAMERA,
//       android: PERMISSIONS.ANDROID.CAMERA
//     })

//     // assume permission is true
//     if (!permission) {
//       return true
//     }

//     const result = await request(permission)

//     if (result === RESULTS.BLOCKED) {
//       await openSettings()
//     }

//     if (result !== RESULTS.GRANTED) {
//       return false
//     }

//     return true
//   }

//   static async requestAll() {
//     const results = [
//       await Permitter.requestStorage(),
//       await Permitter.requestMicrophone(),
//       await Permitter.requestCamera()
//     ]

//     for (const result of results) {
//       if (result === false) {
//         return false
//       }
//     }

//     return true
//   }
// }

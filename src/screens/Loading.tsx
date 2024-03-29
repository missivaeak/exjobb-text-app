/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState, useContext, useEffect, useRef } from 'react'
import { Text, View } from 'react-native'
import { useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera'

import GlobalContext from '../contexts/GlobalContext'
import Database from '../services/Database'
import Initialiser from '../services/Initialiser'
// import Permitter from '../services/Permitter'

const Loading = ({setIsLoading, isLoading}: {
  setIsLoading: (setIsLoading: boolean) => void,
  isLoading: boolean
}) => {
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const [ databaseOk, setDatabaseOk ] = useState(false)
  const [ permissionsOk, setPermissionsOk ] = useState(false)

  /**
   * promise function to check database
   */
  function checkDatabase(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let database: Database

        // timeout after 30s
        const timeout = setTimeout(() => {
          console.warn('checkDatabase timed out after 30s')
          reject()
        },30000)

      if (!globalState.database) {
        database = new Database()

        // test and set up database as necessary
        database.ping().then(async (result) => {
          if (result.firstRun === "true") {
            console.log('first run, running initialiser')
            await Initialiser.run(database)
          }

          // set database in global state
          setGlobalState({
            ...globalState,
            database
          })

          // clear timeout
          clearTimeout(timeout)
          resolve(true)
        },(reason) => {
          console.warn(reason)
        }).catch((error) => {
          console.error("Error connecting to database:", error)
          throw error
        })
      }
    })
  }

  /**
   * promise function to check permissions
   */
  // function checkPermissions(): Promise<boolean> {
  //   return new Promise((resolve, reject) => {
  //     Permitter.checkAll().then((result): void => {
  //       if (result === false) {
  //         Permitter.requestAll().then((success) => {
  //           resolve(true)
  //         })

  //         return
  //       }

  //       resolve(true)
  //     }).catch((error) => {
  //       console.log("Error clearing permissions check:", error)
  //       reject()
  //     })
  //   })
  // }

  // check all load conditions
  useEffect(() => {
    if (databaseOk && permissionsOk) {
      return setIsLoading(false)
    }

    return setIsLoading(true)
  }, [
    databaseOk,
    permissionsOk
  ])

  useEffect(() => {
    checkDatabase().then((success) => {
      if (success) {
        return setDatabaseOk(true)
      }

      return setDatabaseOk(false)
    },(reason) => {
      console.warn(reason)

      return false
    })
  }, [])

  useEffect(() => {
    setPermissionsOk(true)
    // checkPermissions().then((success) => {
    //   if (success) {
    //     return setPermissionsOk(true)
    //   }

    //   return setPermissionsOk(false)
    // })
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Text>Loading...</Text>
    </View>
  )
}

export default Loading

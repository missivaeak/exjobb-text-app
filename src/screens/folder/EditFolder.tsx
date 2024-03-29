/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import type Container from '../../classes/references/Container'
import type { RootStackScreenProps } from '../../navigation/types'

import GlobalContext from '../../contexts/GlobalContext'

import FolderAddButton from '../../components/folder/FolderAddButton'
import PlaceAddButton from '../../components/place/PlaceAddButton'
import FolderPicture from '../../components/folder/FolderPicture'
import PlacePicture from '../../components/place/PlacePicture'

export default function EditFolder(
  {route, navigation}: RootStackScreenProps<'EditFolder'>
) {
  const [folder, setFolder] = useState<Container>(route.params.folder)
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const [ folders, setFolders ] = useState<Array<Container>>([])
  const [ places, setPlaces ] = useState<Array<Container>>([])
  // console.log(folder)

  const addChildFolder = useCallback(() => {
    navigation.push('SnapPicture', {
      targetType: 'folder',
      parent: route.params.folder
    })
    setFolder(Object.create(route.params.folder))
  }, [])

  const addChildPlace = useCallback(() => {
    navigation.push('SnapPicture', {
      targetType: 'place',
      parent: route.params.folder
    })
    setFolder(Object.create(route.params.folder))
  }, [])

  const removeChildContainer = useCallback((container: Container) => {
    let alertTitle: string
    let alertMessage: string

    switch (container.type) {
      case 'place':
        alertTitle = "Ta bort plats"
        alertMessage = "Vill du ta bort platsen inklusive alla scener, regioner och ljudinspelningar? Detta går inte att ångra."
        break
      case 'folder':
        alertTitle = "Ta bort mapp"
        alertMessage = "Vill du ta bort mappen inklusive alla platser, scener, regioner och ljudinspelningar? Detta går inte att ångra."
        break
      default:
        throw new Error('Invalid container type: ' + container.type)
    }

    Alert.alert(
      alertTitle,
      alertMessage,
      [
        { text: "OK", onPress: () => {
          globalState.database?.delete(container).then(() => {
            route.params.folder.removeContainer(container)
            setFolder(Object.create(route.params.folder))
          })
        }},
        { text: "Avbryt" },
      ],
      {
        cancelable: true,
      }
    )
  }, [])

  // main useeffect to update on navigation to screen
  useFocusEffect(useCallback(() => {
    globalState.database?.sync(route.params.folder)?.then((result) => {
      setFolder(Object.create(result))
    })

    return () => {
      // teardown not necessary
    }
  }, [route, navigation]))

  // when folder state is changed
  // update subfolders and places
  useEffect(() => {
    const foldersTemp: Array<Container> = []
    const placesTemp: Array<Container> = []

    for (const container of folder.containers) {
      switch (container.type) {
        case 'folder':
          foldersTemp.push(container)
          break
        case 'place':
          placesTemp.push(container)
          break
      }
    }

    setFolders(foldersTemp)
    setPlaces(placesTemp)
  }, [folder])

  return (
    <View
      style={styles.wrapper}>
      <View
        style={styles.folders}
        >
        {folders.map((container) => {
          return (
            <FolderPicture
              picture={container.picture}
              key={container.databaseId}
              deleteOverlay={true}
              callback={() => {
                removeChildContainer(container)
              }}
              >
            </FolderPicture>
          )
        })}

        <FolderAddButton
          callback={addChildFolder}
          />
      </View>

      <View
        style={styles.places}
        >
        {places.map((container) => {
          return (
            <PlacePicture
              picture={container.picture}
              key={container.databaseId}
              deleteOverlay={true}
              callback={() => {
                removeChildContainer(container)
              }}
              >
            </PlacePicture>
          )
        })}

        <PlaceAddButton
          callback={addChildPlace}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row'
  },
  folders: {
    // flex: 1,
    width: '25%',
    backgroundColor: '#dfdfdf',
  },
  folder: {
    width: '100%',
  },
  places: {
    // flex: 3,
    width: '75%',
    padding: 10,
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  place: {
    width: '45%',
    aspectRatio: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
})

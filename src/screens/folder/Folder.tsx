/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Text, View, Button, Image, Pressable, StyleSheet, ScrollView } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import type Container from '../../classes/references/Container'
import type { RootStackScreenProps } from '../../navigation/types'

import GlobalContext from '../../contexts/GlobalContext'
import EnvVars from '../../constants/EnvVars'
import FolderPicture from '../../components/folder/FolderPicture'
import PlacePicture from '../../components/place/PlacePicture'

const ContainerImage = (props: {source: string}) => {
  let component = (<></>)

  if (props.source) {
    component = (
        <Image
          style={{
            width: '60%',
            aspectRatio: 1,
            resizeMode: 'contain',
          }}
          source={{
            uri: EnvVars.baseDir + props.source
          }}
        />
    )
  }

  return component
}

export default function Folder({navigation, route}: RootStackScreenProps<'Folder'>) {
  const [ folder, setFolder ] = useState<Container>(route.params.folder)
  const [ folders, setFolders ] = useState<Array<Container>>([])
  const [ places, setPlaces ] = useState<Array<Container>>([])
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useFocusEffect(useCallback(() => {
    globalState.database?.sync(route.params.folder)?.then((result) => {
      setFolder(Object.create(result))
    })

    navigation.setOptions({title: route.params.folder.name})

    return () => {
      // teardown not necessary
    }
  }, [route, navigation]))

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
      {folders.length > 0 ?
        <View
        style={styles.folders}
        >
        {folders.map((folder) => {
          return (
            <FolderPicture
              picture={folder.picture}
              key={folder.databaseId}
              callback={() => {
                navigation.push('Folder', { folder })
              }}
              >
            </FolderPicture>
          )
        })}
      </View>
      : <></>}

      <View
        style={[styles.places, folders.length > 0 ? styles.placesPartWidth : styles.placesFullWidth]}
        >
        {places.map((place) => {
          return (
            <PlacePicture
              picture={place.picture}
              key={place.databaseId}
              callback={() => {
                navigation.push('Place', { place })
              }}
              >
            </PlacePicture>
          )
        })}
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
    width: '25%',
    flexDirection: 'column',
    backgroundColor: '#dfdfdf',
    alignContent: 'center'
  },
  // folder: {
  //   width: '100%',
  //   aspectRatio: 1,
  //   // fontSize: 40,
  //   alignSelf: 'center'
  // },
  places: {
    padding: 10,
    gap: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  placesFullWidth: {
    width: '100%'
  },
  placesPartWidth: {
    width: '75%'
  },
  // place: {
  //   width: '45%',
  //   aspectRatio: 1,

  //   // borderWidth: 2,
  //   // borderRadius: 12,
  //   // borderColor: '#bbb',

  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  addButton: {
    fontSize: 100,
    alignSelf: 'center',
    color: '#000000'
  }
})

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
import ScenePicture from '../../components/scene/ScenePicture'
import Scene from '../../classes/references/Scene'

export default function Place({navigation, route}: RootStackScreenProps<'Place'>) {
  const [ place, setPlace ] = useState<Container>(route.params.place)
  const [ scenes, setScenes ] = useState<Array<Scene>>([])
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useFocusEffect(useCallback(() => {
    globalState.database?.sync(route.params.place)?.then((result) => {
      if (result) {
        setPlace(Object.create(result))
      }
    })

    navigation.setOptions({title: route.params.place.name})

    return () => {
      // teardown not necessary
    }
  }, [route, navigation]))

  useEffect(() => {
    const scenesTemp: Array<Scene> = []

    for (const scene of place.scenes) {
      scenesTemp.push(scene)
    }

    setScenes(scenesTemp)
  }, [place])

  return (
    <View
      style={styles.wrapper}>

        {scenes.map((scene) => {
          return (
            <ScenePicture
              picture={scene.picture}
              key={scene.databaseId}
              callback={() => {
                navigation.push('Scene', { scene })
              }}
              >
            </ScenePicture>
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
})

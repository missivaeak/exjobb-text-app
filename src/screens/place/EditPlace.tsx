/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect, useCallback } from 'react'
import { Text, View, Button, Image, Pressable, StyleSheet, ScrollView, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import type Container from '../../classes/references/Container'
import type { RootStackScreenProps } from '../../navigation/types'

import GlobalContext from '../../contexts/GlobalContext'
import SceneAddButton from '../../components/scene/SceneAddButton'
import ScenePicture from '../../components/scene/ScenePicture'
import Scene from '../../classes/references/Scene'

export default function EditPlace(
  {route, navigation}: RootStackScreenProps<'EditPlace'>
) {
  const [ place, setPlace ] = useState<Container>(route.params.place)
  const { globalState, setGlobalState } = useContext(GlobalContext)
  const [ scenes, setScenes ] = useState<Array<Scene>>([])
  // console.log(folder)

  const addScene = useCallback(() => {
    navigation.push('SnapPicture', {
      targetType: 'scene',
      parent: route.params.place
    })
    setPlace(Object.create(route.params.place))
  }, [])

  const removeScene = useCallback((scene: Scene) => {
    Alert.alert(
      "Ta bort scen",
      "Vill du ta bort scenen inklusive alla regioner och ljudinspelningar? Detta går inte att ångra.",
      [
        { text: "OK", onPress: () => {
          globalState.database?.delete(scene).then(() => {
            route.params.place.removeScene(scene)
            setPlace(Object.create(route.params.place))
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
    globalState.database?.sync(route.params.place)?.then((result) => {
      setPlace(Object.create(result))
    })

    return () => {
      // teardown not necessary
    }
  }, [route, navigation]))

  // when folder state is changed
  // update subfolders and places
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
            deleteOverlay={true}
            callback={() => {
              removeScene(scene)
            }}
            >
          </ScenePicture>
        )
      })}

      <SceneAddButton
        callback={addScene}
        />
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
  },
})

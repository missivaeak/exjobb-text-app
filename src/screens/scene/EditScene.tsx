/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

/** Libraries **/
import React, { useState, useContext, useEffect, useCallback, useRef } from 'react'
import { Text, View, Pressable, Image, StyleSheet, GestureResponderEvent, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
// import prompt from 'react-native-prompt-android'

/** Types **/
import type { RootStackScreenProps } from '../../navigation/types'
import type CoordinatesType from '../../types/CoordinatesType'

/** General **/
import GlobalContext from '../../contexts/GlobalContext'
import Scene from '../../classes/references/Scene'
import Region from '../../classes/references/Region'
import Sound from '../../classes/references/Sound'
import Circle from '../../classes/shapes/Circle'
import EnvVars from '../../constants/EnvVars'

/** Components **/
import SoundRecorder from '../../components/SoundRecorder'
import ModalDefault from '../../components/ModalDefault'
import Shape from '../../components/Shape'

export default function EditScene(
  {route, navigation}: RootStackScreenProps<'EditScene'>
) {
  const [ scene, setScene ] = useState<Scene>(route.params.scene)
  const { globalState, setGlobalState, modalOpen, setModalOpen } = useContext(GlobalContext)
  const [ regions, setRegions ] = useState<Array<Region>>([])
  const [ modalContent, setModalContent ] = useState(<></>)
  const coords = useRef<CoordinatesType>({x: 0, y: 0})
  // console.log(folder)

  const saveSound = useCallback(async () => {
    if (!globalState.database) { return }
    // const sound = new Sound({})

    const shape = new Circle({ radius: 50 })
    const region = await globalState.database.insertRegion(coords.current, shape, scene)
    setModalOpen(false)

    globalState.database?.sync(route.params.scene)?.then((result) => {
      if (result) {
        setScene(Object.create(result))
      }
    })
  }, [])

  const recordSound = useCallback((event: GestureResponderEvent) => {
    if (!globalState.database) { return }

    coords.current = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY
    }

    setModalContent(<SoundRecorder
      saveSound={saveSound}
      />)
    setModalOpen(true)

    setScene(Object.create(route.params.scene))
  }, [])

  const deleteRegion = useCallback((region: Region) => {
    Alert.alert(
      "Ta bort region",
      "Vill du ta bort regionen och ljudinspelningen? Detta går inte att ångra.",
      [
        { text: "OK", onPress: () => {
          globalState.database?.delete(region).then(() => {
            route.params.scene.removeRegion(region)
            setScene(Object.create(route.params.scene))
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
    globalState.database?.sync(route.params.scene)?.then((result) => {
      if (result) {
        setScene(Object.create(result))
      }
    })

    return () => {
      // teardown not necessary
    }
  }, [route, navigation]))

  // when folder state is changed
  // update subfolders and places
  useEffect(() => {
    const regionsTemp: Array<Region> = []

    for (const region of scene.regions) {
      regionsTemp.push(region)
    }

    setRegions(regionsTemp)
    console.log(regions)
  }, [scene])

  return (
    <View
      style={styles.flex}>
      <Pressable
        style={styles.flex}
        onPress={recordSound}
        >
        <Image
          style={styles.scene}
          source={{
            uri: EnvVars.baseDir + scene.picture.source
          }}
          />
      </Pressable>

      {regions.map((region) => {
        return (<Shape
          key={region.databaseId}
          region={region}
          deleteOverlay={true}
          deleteCallback={deleteRegion}
          />)
      })}

      {modalOpen ? 
        <ModalDefault
          setModalOpen={setModalOpen}
          >
            {modalContent}
        </ModalDefault>
      : null}
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  scene: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain'
  },
  pressed: {
    opacity: 0.65
  }
})

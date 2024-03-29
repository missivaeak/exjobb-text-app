/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useContext, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'

import type { RootStackScreenProps } from '../navigation/types'
import Container from '../classes/references/Container'
import StartingPointPicture from '../components/StartingPointPicture'

import GlobalContext from '../contexts/GlobalContext'
import styles from '../constants/styles'

export default function Home({ navigation, route }: RootStackScreenProps<'Home'>) {
  // const [ startingPoint, setStartingPoint ] = useState<Container>()
  const [ startingPlace, setStartingPlace ] = useState<Container>()
  const { globalState, setGlobalState } = useContext(GlobalContext)

  useEffect(() => {
    // globalState?.database?.getStartingPoint().then((result) => {
    //   setStartingPoint(result)
    //   return
    // })

    globalState?.database?.getContainersOfStartingPoint().then((result) => {
      setStartingPlace(result[0])
      return
    })
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      {startingPlace ?
        <>
          <Pressable
            // onPress={() => {
            //   navigation.push('Folder', {folder: startingPoint})
            // }}
            onPress={() => {
              navigation.push('Place', {place: startingPlace})
            }}
            style={({pressed}) => [
              {
                alignItems: 'center'
              },
              styles.buttonLike,
              pressed ? styles.buttonLikePressed : null
            ]}
            >

            <StartingPointPicture source={startingPlace.picture.source} />
          </Pressable>

          <Text>Börja använda appen.</Text>
        </>
      : <></>}
    </View>
  )
}

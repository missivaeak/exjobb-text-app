import { useContext, useState } from 'react'
// import { View, Button, Text } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { RootStackNavigationProp, RootStackParamList } from './types'

import GlobalContext from '../contexts/GlobalContext'

import Home from '../screens/Home'
import Loading from '../screens/Loading'
// import Folder from '../screens/folder/Folder'
// import EditFolder from '../screens/folder/EditFolder'
import Place from '../screens/place/Place'
import EditPlace from '../screens/place/EditPlace'
import Scene from '../screens/scene/Scene'
import EditScene from '../screens/scene/EditScene'
import SnapPicture from '../screens/picture/SnapPicture'
import ConfirmPicture from '../screens/picture/ConfirmPicture'

import Spinner from '../components/Spinner'
// import FolderSettingsButton from '../components/folder/FolderSettingsButton'
import PlaceSettingsButton from '../components/place/PlaceSettingsButton'
import SceneSettingsButton from '../components/scene/SceneSettingsButton'
import NavigateBack from '../components/NavigateBack'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const { globalState, setGlobalState, spinnerActive } = useContext(GlobalContext)
  // const [iconSrc, setIconSrc] = useState<{scale: number, uri: string}>({scale: 1, uri: ''})

  if (isLoading) {
    return (
      <Loading
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        />
    )
  }
  // MaterialCommunityIcon.getImageSource('gamma', 20, '#000').then((result) => {
  //   return setIconSrc(result)
  // })

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({navigation, route}) => {
          return {
            headerLeft: () => (
              <NavigateBack 
                onPress={() => { navigation.goBack() }}
                />
            )
          }
        }}
        >

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
          />

        {/* <Stack.Screen
          name="EditFolder"
          component={EditFolder}
          options={{
            title: 'Redigera mapp'
          }}
          /> */}

        {/* <Stack.Screen
          name="Folder"
          component={Folder}
          options={{
            title: 'unknown folder',
            headerRight: FolderSettingsButton
          }}
          /> */}

        <Stack.Screen
          name="EditPlace"
          component={EditPlace}
          options={{
            title: 'Redigera plats'
          }}
          /> 

        <Stack.Screen
          name="Place"
          component={Place}
          options={{
            title: 'unknown place',
            headerRight: PlaceSettingsButton
          }}
          />

        <Stack.Screen
          name="EditScene"
          component={EditScene}
          options={{
            title: 'Redigera scen'
          }}
          />

        <Stack.Screen
          name="Scene"
          component={Scene}
          options={{
            title: 'unknown scene',
            headerRight: SceneSettingsButton
          }}
          />

        <Stack.Screen
          name="SnapPicture"
          component={SnapPicture}
          options={{
            title: 'Ta bild'
          }}
          />

        <Stack.Screen
          name="ConfirmPicture"
          component={ConfirmPicture}
          options={{
            title: 'Bekräfta bild'
          }}
          />
      </Stack.Navigator>

      {/* <DebugMenu /> */}

      {spinnerActive ? <Spinner /> : null}

    </NavigationContainer>
  )
}

export type { RootStackParamList }

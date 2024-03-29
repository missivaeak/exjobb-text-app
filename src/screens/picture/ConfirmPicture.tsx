import { useCallback, useContext, useEffect  } from "react"
import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useNavigation } from "@react-navigation/native"
// import prompt from 'react-native-prompt-android'
// import { Alert } from "rn-custom-alert-prompt"

import type { RootStackScreenProps } from "../../navigation/types"
import type Picture from "../../classes/Picture"

import EnvVars from "../../constants/EnvVars"
import GlobalContext from "../../contexts/GlobalContext"
import Container from "../../classes/references/Container"
import ReferenceOptions from "../../classes/references/ReferenceOptions"
import styles from "../../constants/styles"

function ConfirmButton(props: {
  targetType: 'folder' | 'place' | 'scene',
  picture: Picture,
  parent: Container
}) {
  const navigation = useNavigation<RootStackScreenProps<'ConfirmPicture'>['navigation']>()
  const { globalState, setGlobalState } = useContext(GlobalContext)

  const promptName = useCallback(async (alertTitle: string, alertMessage: string): Promise<string> => {
    return new Promise((resolve, reject) => {

      console.log("eaoeoeoe22223")

      // prompt(
      //   alertTitle,
      //   alertMessage,
      //   [
      //     { text: "OK", style: 'default', onPress: (value) => {
      //       console.log("snark")
      //       return resolve(value)
      //     }},
      //   ],
      //   {
      //     cancelable: false,
      //   }
      // );
    })
  }, [])

  const confirm = useCallback(async () => {
    let options: ReferenceOptions
    let name: string = ''
    let alertTitle: string
    let alertMessage: string

    switch (props.targetType) {
      case 'folder':
        alertTitle = 'Ny mapp'
        alertMessage = 'Välj namn på den nya mappen.'
        break
      case 'place':
        alertTitle = 'Ny plats'
        alertMessage = 'Välj namn på den nya platsen.'
        break
      case 'scene':
        alertTitle = 'Ny scen'
        alertMessage = 'Välj namn på den nya scenen.'
        break
      default:
        throw new Error('Cannot confirm picture, unknown target type: ' + props.targetType)
    }
    

    // name = await promptName(alertTitle, alertMessage)
    // name = await Alert.prompt(alertTitle, alertMessage)
    name = 'Scen'

    options = {
      type: props.targetType,
      name,
      description: 'Beskrivning',
      parent: props.parent
    }

    if (props.targetType === 'scene') {
      return globalState.database?.addScene(options, props.picture).then(() => {
        navigation.pop(2)
      })
    }

    return globalState.database?.addContainer(options, props.picture).then(() => {
      navigation.pop(2)
    })
  }, [])


  return (
    <View
      style={{
        position: 'absolute',
        bottom: EnvVars.contentSpacing,
        width: '100%',
        flex: 1,
        alignItems: 'center'
      }}
      >
      <Pressable
        style={({pressed}) => [
          styles.buttonLike,
          pressed ? styles.pressed : null
        ]}
        onPress={confirm}
        >
        <Text
          style={{fontSize: 30}}
          >
            Foinå
        </Text>
        {/* <MaterialCommunityIcon
          color='#00880099'
          name='check-circle-outline'
          size={EnvVars.captureButtonSize}
          /> */}
      </Pressable>
    </View>
  )
}


export default function ConfirmPicture(
  { navigation, route }: RootStackScreenProps<'ConfirmPicture'>
) {
  const picture = route.params.picture
  const { globalState, setGlobalState, setSpinnerActive } = useContext(GlobalContext)

  useEffect(() => {
    navigation.addListener('beforeRemove', (event) => {
      if (event.data.action.target) {
        event.preventDefault()
        setSpinnerActive(true)

        // Delete from database and then remove picture
        globalState.database?.delete(picture).then(() => {
          picture.destroy().then(() => {
            console.log("DESTROY picture")
            setSpinnerActive(false)
    
            navigation.dispatch(event.data.action)
          })
        })
      }

      return
    })
  }, [])

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'center'
      }}
      >
      <Image
        style={{
          // ...StyleSheet.absoluteFillObject,
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}
        source={{ uri: EnvVars.baseDir + picture.source }}
        />
      
      <ConfirmButton 
        picture={picture}
        targetType={route.params.targetType}
        parent={route.params.parent}
        />
    </View>
  )
}

import {
  useRef,
  useCallback,
  useContext,
  useState,
  useEffect
} from "react"
import { View, StyleSheet, Text, Image, Pressable } from "react-native"
import { Asset } from 'expo-asset'

import useIsForeground from "../../hooks/useIsForeground"
import EnvVars from "../../constants/EnvVars"
import Photographer from "../../services/Photographer"
import GlobalContext from "../../contexts/GlobalContext"
import ModalDefault from "../../components/ModalDefault"
import { RootStackScreenProps } from "../../navigation/types"
import styles from "../../constants/styles"

function CaptureButton({
  navigation,
  onPhotoCaptured
}: {
  navigation: RootStackScreenProps<'SnapPicture'>['navigation'],
  onPhotoCaptured: (navigation) => void
}) {
  const { globalState, setGlobalState, setSpinnerActive} = useContext(GlobalContext)

  const takePhoto = useCallback(async (navigation) => {
    try {
      // if (camera.current == null) throw new Error('Camera ref is null!')

      setSpinnerActive(true)
      // console.log('Taking photo...')

      // const photo = await camera.current.takePhoto({
      //   enableShutterSound: false
      // })

      onPhotoCaptured(navigation)
    } catch (e) {
      console.error('Failed to take photo!', e)
    }
  }, [])

  return (
    <View style={componentStyles.flex}>
      <Pressable
        onPress={() => {
          takePhoto(navigation)
        }}
        style={({pressed}) => [
          styles.buttonLike,
          pressed ? styles.pressed : null
        ]}
        >
        <Text
          style={{fontSize: 30}}
          >
          Blyll
        </Text>
        {/* {({pressed}) => (
          <View style={pressed ? componentStyles.pressedButton : componentStyles.button} />
        )} */}
      </Pressable>
    </View>
  )
}

export default function SnapPicture(
  { navigation, route }: RootStackScreenProps<'SnapPicture'>
) {
  // const device = useCameraDevice('back')
  const { globalState, setGlobalState, setSpinnerActive } = useContext(GlobalContext)
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ modalContent, setModalContent] = useState({
    header: '',
    text: ''
  })

  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [facing, setFacing] = useState('back');
  // const [type, setType] = useState(CameraType.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const cameraRef = useRef(null);

  // console.log(permission)

  // ref that is assigned by the Camera component
  // and used by the CaptureButton component
  // const camera = useRef<Camera>(null)

  // error handling
  // const onError = useCallback((error: CameraRuntimeError) => {
  //   console.error(error)
  // }, [])

  // todo: remove show modal (for debugging)
  const showModal = useCallback((header: string, text: string) => {
    setModalContent({ header, text })
    setModalOpen(true)
  }, [])

  // main photo snap function
  const onPhotoCaptured = useCallback(
    async (nav) => {
      const path = await Photographer.save()
      const picture = await globalState.database?.insertPicture(path, 'jpg')

      setSpinnerActive(false)

      if (picture) {
        return nav.push("ConfirmPicture", {
          ...route.params,
          picture
        })
      }

      showModal('Problem capturing photo!', JSON.stringify(picture))
    },
    [],
  )


  return (
    <View 
      style={componentStyles.container}
      >
      <Image
        style={[
          StyleSheet.absoluteFill,
          {
            resizeMode: 'cover',
            width: '100%',
            height: '100%'
          }
        ]}
        source={require('../../assets/camera.jpg')}
        />
      <Text
        style={{
          left: 0,
          top: 250,
          position: 'absolute',
          textAlign: 'center',
          fontSize: 60,
          color: '#ff0000',
          width: '400%',
          transform: [
            {translateX: -610},
            {rotate: '20deg'}
          ]
        }}
      >
        KAMERA KAMERA KAMERA KAMERA KAMERA KAMERA KAMERA KAMERA KAMERA
      </Text>



      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          flex: 1
        }}
        >
        <View
          style={componentStyles.captureButton}
          >
          <CaptureButton
            // camera={cameraRef}
            navigation={navigation}
            onPhotoCaptured={onPhotoCaptured}
            />
        </View>
      </View>

      {modalOpen ? 
        <ModalDefault
          setModalOpen={setModalOpen}
          >
          <Text>
            {modalContent.header}
          </Text>

          <Text>
            {modalContent.text}
          </Text>
        </ModalDefault>
      : <></>}
    </View>
  )
}

const borderWidth = EnvVars.captureButtonSize * 0.1

const componentStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: 'transparent',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: EnvVars.safeAreaPadding.paddingBottom,
  },
  // button: {
  //   marginBottom: EnvVars.contentSpacing,
  //   width: CONTROL_BUTTON_SIZE,
  //   height: CONTROL_BUTTON_SIZE,
  //   borderRadius: CONTROL_BUTTON_SIZE / 2,
  //   backgroundColor: 'rgba(140, 140, 140, 0.3)',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  rightButtonRow: {
    position: 'absolute',
    right: EnvVars.safeAreaPadding.paddingRight,
    top: EnvVars.safeAreaPadding.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  flex: {
    flex: 1,
  },
  button: {
    width: EnvVars.captureButtonSize,
    height: EnvVars.captureButtonSize,
    borderRadius: EnvVars.captureButtonSize / 2,
    borderWidth: borderWidth,
    borderColor: '#303030',
    backgroundColor: '#ffffff44',
  },
  pressedButton: {
    width: EnvVars.captureButtonSize,
    height: EnvVars.captureButtonSize,
    borderRadius: EnvVars.captureButtonSize / 2,
    borderWidth: borderWidth,
    borderColor: '#cccccc',
    backgroundColor: '#00000044',
  }
})

import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import * as Speech from 'expo-speech'
import { Audio } from "expo-av"

import type CustomButtonType from "../types/CustomButtonType"
// import type Sound from "../classes/references/Sound"

// import Recorder from "../services/Recorder"
// import Player from "../services/Player"
import GlobalContext from "../contexts/GlobalContext"
import styles from "../constants/styles"

function CustomButton({onPress, icon, style}: CustomButtonType<void>) {
  return (<>
    <Pressable
      style={({pressed}) => [
        styles.buttonLike,
        pressed ? styles.buttonLikePressed : null,
        {margin: 5}
      ]}
      onPress={onPress}
      >
      <Text
        style={{fontSize: 30}}
        >
        {icon}
      </Text>
    </Pressable>
  </>)
}

export default function SoundRecorder(
  {saveSound}: {saveSound: () => void}
) {
  let timer: NodeJS.Timeout
  // let recorder: Recorder

  const [ step, setStep ] = useState("ready")
  const filename = useRef('')
  const {globalState, setGlobalState} = useContext(GlobalContext)
  const [sound, setSound] = useState<Audio.Sound>();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('../assets/audio.mp3'))
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    // recorder = new Recorder()
  }, [])

  const record = useCallback(async () => {
    setStep('recording')

    timer = enqueueStep('reviewing', 5000, () => {
      // recorder.stop()
      clearTimeout(timer)
    })

    // filename.current = await recorder.start()
  }, [])

  const stop = useCallback(() => {
    clearTimeout(timer)
    setStep('reviewing')

    // recorder.stop()
  }, [])

  const play = useCallback(() => {
    setStep('listening')

    timer = enqueueStep('reviewing', 2000, () => {
      // recorder.stop()
      clearTimeout(timer)
    })

    // Speech.speak('sample audio', {
    //   onDone: () => {
    //     setStep('reviewing')
    //   }
    // })
    playSound()

    // Player.play(filename.current, () => {
    //   setStep('reviewing')
    // })
  }, [])

  const confirm = useCallback(async () => {
    if (!globalState.database) { return }

    // TODO: somewhere the app needs to clear
    // unwanted sounds if the users cancels instead of confirms

    // const sound = await globalState.database.insertSound(filename.current)

    saveSound()
  }, [])

  const enqueueStep = useCallback((
    nextStep: "ready" | "recording" | "reviewing" | "listening",
    delay: number,
    callback?: () => void
  ) => {
    let timer: NodeJS.Timeout

    timer = setTimeout(() => {
      setStep(nextStep)
      clearTimeout(timer)

      if (callback) {
        callback()
      }
    }, delay)

    return timer
  }, [])

  return (
    <View
      style={componentStyles.wrapper}
      >
      { step === "ready" ?
        <CustomButton
          onPress={record}
          style={componentStyles.recordIcon}
          icon='Sisoem'
          />
        : null }

      { step === "recording" ?
        <CustomButton
          onPress={stop}
          style={componentStyles.stopIcon}
          icon='Glinmere'
          />
        : null }

      { step === "reviewing" ?
        <>
          <CustomButton
            onPress={play}
            style={componentStyles.playIcon}
            icon='Mo'
            />
          <CustomButton
            onPress={record}
            style={componentStyles.recordIcon}
            icon='Sisoem'
            />
          <CustomButton
            onPress={confirm}
            style={componentStyles.confirmIcon}
            icon='Foinå'
            />
        </>
        : null }
    </View>
  )
}

const componentStyles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  recordIcon: {
    color: '#000000',
    fontSize: 100
  },
  stopIcon: {
    color: '#000000',
    fontSize: 100
  },
  playIcon: {
    color: '#000000',
    fontSize: 100
  },
  confirmIcon: {
    color: '#000000',
    fontSize: 75
  },
  pressed: {
    opacity: 0.65
  }
})
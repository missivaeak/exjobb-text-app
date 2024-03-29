import { GestureResponderEvent } from "react-native"

type PressableType<R> = {
    onPress: (event: GestureResponderEvent) => R
}

export default PressableType
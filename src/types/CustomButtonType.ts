import type { GestureResponderEvent, StyleProp, TextStyle } from "react-native"

type CustomButtonType<R> = {
    onPress: (event: GestureResponderEvent) => R,
    style: StyleProp<TextStyle>
    icon: string
}

export default CustomButtonType
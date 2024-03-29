import { StyleSheet, Platform, ColorValue } from "react-native"

const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: ColorValue,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: ColorValue,
) => {
  let style = {}

  if (Platform.OS === 'ios') {
    style = {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    }
  } else if (Platform.OS === 'android') {
    style = {
      elevation,
      shadowColor: shadowColorAndroid,
    }
  }

  return style
};

export default StyleSheet.create({
  pressed: {
    opacity: 0.65
  },
  buttonLike: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    backgroundColor: '#9fd5e3',
    ...generateBoxShadowStyle(-2, 4, '#aaa', 0.2, 3, 10, '#000')
  },
  buttonLikePressed: {
    ...generateBoxShadowStyle(2, -4, '#aaa', 0.2, 3, 0, '#000')
  }
})
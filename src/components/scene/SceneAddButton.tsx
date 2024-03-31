import { Pressable, StyleSheet, Text } from "react-native"
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from "../../constants/styles"

export default function SceneAddButton({callback}: {callback: () => void}) {
  return (
    <Pressable
      style={({pressed}) => [
        componentStyles.button,
        styles.buttonLike,
        pressed ? styles.buttonLikePressed : null
      ]}
      onPress={callback}
      >
      {/* <MaterialCommunityIcon
        style={componentStyles.icon}
        name='looks'
        adjustsFontSizeToFit={true}
        /> */}
      <Text
        style={{fontSize: 35}}
        >
        Boodoo
      </Text>
    </Pressable>
  )
}

const componentStyles = StyleSheet.create({
  button: {
    alignSelf: 'center'
  },
  icon: {
    fontSize: 120,
    // color: '#000000'
  }
})

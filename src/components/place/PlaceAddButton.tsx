import { Pressable, StyleSheet } from "react-native"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PlaceAddButton(props: {callback: () => void}) {
  return (
    <Pressable
      style={styles.button}
      onPress={props.callback}
      >
      <MaterialCommunityIcon
        style={styles.icon}
        name='store-plus-outline'
        adjustsFontSizeToFit={true}
        />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center'
  },
  icon: {
    fontSize: 120,
    // color: '#000000'
  }
})

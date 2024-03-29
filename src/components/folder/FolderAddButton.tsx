import { Pressable, StyleSheet } from "react-native"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function FolderAddButton(props: {callback: () => void}) {
  return (
    <Pressable
      style={styles.button}
      onPress={props.callback}
      >
      <MaterialCommunityIcon
        style={styles.icon}
        name='folder-plus-outline'
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
    fontSize: 100,
  }
})

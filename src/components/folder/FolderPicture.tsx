
import { Image, StyleProp, ImageStyle, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Picture from "../../classes/Picture";
import EnvVars from "../../constants/EnvVars";

export default function FolderPicture(props: {
  picture: Picture,
  style?: StyleProp<ImageStyle>,
  callback?: () => void,
  deleteOverlay?: boolean
}) {
  return (
    <Pressable
      onPress={props.callback ? props.callback : null}
      >
      <Image
        style={[styles.image, props.style]}
        // style={styles.image}
        source={{
          uri: EnvVars.baseDir + props.picture.source
        }}
        />
      
      {props.deleteOverlay ?
        <MaterialCommunityIcon
        style={styles.deleteOverlay}
        name='trash-can-outline'
        />
      : <></>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '45%'
  },
  image: {
    width: '100%',
    // flex: 1,
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  deleteOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    fontSize: 50,
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 10,
    textShadowOffset: {
      width: 2,
      height: 2
    }
  }
})

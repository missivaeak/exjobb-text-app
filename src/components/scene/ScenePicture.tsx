
import { Image, StyleProp, ImageStyle, StyleSheet, Pressable, Text } from "react-native";
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Picture from "../../classes/Picture";
import EnvVars from "../../constants/EnvVars";
import styles from "../../constants/styles";

export default function ScenePicture(props: {
  picture: Picture,
  style?: StyleProp<ImageStyle>,
  callback?: () => void,
  deleteOverlay?: boolean
}) {
  return (
    <Pressable
      style={componentStyles.button}
      onPress={props.callback ? props.callback : null}
      >
      <Image
        style={[componentStyles.image, props.style]}
        // style={styles.image}
        source={{
          uri: EnvVars.baseDir + props.picture.source
        }}
        />
      
      {props.deleteOverlay ?
        // <MaterialCommunityIcon
        //   style={styles.deleteOverlay}
        //   name='hexagon-multiple-outline'
        //   />
          <Text
            style={componentStyles.deleteOverlay}
            >
            Maer
          </Text>
      : <></>}
    </Pressable>
  )
}

const componentStyles = StyleSheet.create({
  button: {
    width: 120
  },
  image: {
    width: '100%',
    // flex: 1,
    aspectRatio: 1,
    resizeMode: 'cover'
  },
  deleteOverlay: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    fontSize: 30,
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 10,
    textShadowOffset: {
      width: 2,
      height: 2
    }
  }
})

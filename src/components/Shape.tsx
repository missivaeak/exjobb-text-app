import { GestureResponderEvent, StyleSheet, View, ViewStyle, Pressable, StyleProp, useWindowDimensions, Text } from "react-native";
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import Region from "../classes/references/Region"
// import { useCallback, useEffect, useRef } from "react";
import styles from "../constants/styles";

function DeleteOverlay({
  region,
  callback = null
}: {
  region: Region,
  callback?: ((region: Region) => void) | null
}) {
  const {width, height} = useWindowDimensions()
  let computedStyles = {
    deleteOverlay: {
      top: 0,
      right: 0
    }
  }

  if (region.shape.properties.type === 'circle') {
    const pageX = region.coords.x + region.shape.properties.radius
    const diffX = pageX - width
    const pageY = region.coords.y - region.shape.properties.radius

    if (diffX > 0) {
      computedStyles = {
        deleteOverlay: {
          ...computedStyles.deleteOverlay,
          right: diffX
        }
      }
    }
  
    if (pageY < 0) {
      computedStyles = {
        deleteOverlay: {
          ...computedStyles.deleteOverlay,
          top: region.shape.properties.radius - 12.5
        }
      }
    }
  }

  return (
    <Pressable
      style={({pressed}) => [
        componentStyles.deleteOverlay,
        computedStyles.deleteOverlay,
        styles.buttonLike,
        pressed ? styles.buttonLikePressed : null
      ]}
      onPress={callback ? () => {
        callback(region)
      } : undefined}
      >
      <Text
        style={{fontSize: 18}}
        >
        Maer
      </Text>
    </Pressable>
    // <MaterialCommunityIcon
    //   onPress={callback ? () => {
    //     callback(region)
    //   }: undefined}
    //   name='hexagon-multiple-outline'
    //   style={[
    //     componentStyles.deleteOverlay,
    //     computedStyles.deleteOverlay,
    //     {paddingLeft: 2}
    //   ]}
    //   />
  )
}

export default function Shape({
  region,
  callback = null,
  deleteOverlay = false,
  deleteCallback = null
}: {
  region: Region,
  callback?: ((event: GestureResponderEvent) => void) | null,
  deleteOverlay?: boolean
  deleteCallback?: ((region: Region) => void) | null
}) {
  let computedStyles = {shape: {}}

  if (region.shape.properties.type === 'circle') {
    computedStyles = StyleSheet.create<{shape: any}>({
      shape: {
        borderRadius: region.shape.properties.radius,
            width: region.shape.properties.radius * 2,
            height: region.shape.properties.radius * 2,
            left: region.coords.x,
            top: region.coords.y,
            transform: [
              {translateX: region.shape.properties.radius * -1},
              {translateY: region.shape.properties.radius * -1}
            ]
      }
    })
  }

  return (
    <Pressable
      onPress={callback}
      style={({pressed}) => [
        componentStyles.shape,
        computedStyles.shape,
        pressed && callback ? componentStyles.pressed : null
      ]}
      >
      {deleteOverlay ? <DeleteOverlay
        region={region}
        callback={deleteCallback ? deleteCallback : null}
        /> : null}
    </Pressable>
  )
}

const componentStyles = StyleSheet.create({
  pressed: {
    opacity: 0.65
  },
  shape: {
    backgroundColor: '#33333333',
    position: 'absolute',
    borderColor: '#666',
    borderWidth: 2,
  },
  deleteOverlay: {
    position: 'absolute',
    // height: 50,
    // width: 50,
    // borderRadius: 25,
    // fontSize: 40,
    // color: '#a0f',
    // backgroundColor: '#fff',
    // textAlign: 'center',
    // textAlignVertical: 'center',
    // borderColor: '#000',
    // borderWidth: 1
    // textShadowColor: '#fff',
    // textShadowRadius: 10,
    // textShadowOffset: {
    //   width: 2,
    //   height: 2
    // }
  }
})

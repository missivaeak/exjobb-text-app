// import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native"
// import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withRepeat,
//   withTiming,
//   Easing,
//   cancelAnimation
// } from "react-native-reanimated"

// const AnimatedMaterialCommunityIcon
//   = Animated.createAnimatedComponent(MaterialCommunityIcon)

export default function Spinner() {
  // const rotation = useSharedValue(0);
  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       {
  //         rotateZ: `${rotation.value}deg`,
  //       },
  //     ],
  //   };
  // }, [rotation.value]);

  // useEffect(() => {
  //   rotation.value = withRepeat(
  //     withTiming(360, {
  //       duration: 2000,
  //       easing: Easing.linear,
  //     }),
  //     -1
  //   );
  //   return () => cancelAnimation(rotation);
  // }, []);

  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#ffffffbb',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Text>Loading...</Text>
      {/* <AnimatedMaterialCommunityIcon
        style={animatedStyles}
        name='autorenew'
        size={60}
        /> */}
    </View>
  )
}

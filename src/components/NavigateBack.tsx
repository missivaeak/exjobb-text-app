import { Pressable, Text } from 'react-native'
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

// import type { RootStackScreenProps } from '../navigation/types'
// import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types'

import styles from '../constants/styles'

export default function NavigateBack({onPress}: {onPress: () => void}) {
  return (
    // <MaterialCommunityIcon
    //   onPress={onPress}
    //   style={{
    //     fontSize: 40,
    //     color: '#000',
    //     textAlign: 'center',
    //     textAlignVertical: 'center',
    //     paddingRight: 5
    //   }}
    //   name='gamma'
    //   />
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.buttonLike,
        pressed ? styles.buttonLikePressed : null,
        {
          marginRight: 13
        }
      ]}
      >
      <Text
        style={{
          // height: '100%',
          // paddingRight: 10,
          // textDecorationLine: 'underline',
          // textAlignVertical: 'top'
          color: '#000',
          fontSize: 24
        }}
        >
        Hilm
      </Text>
    </Pressable>
  )
}
import { useRoute, useNavigation } from '@react-navigation/native'
import { Pressable, Text, Button } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { RootStackScreenProps, RootStackNavigationProp } from '../../navigation/types'
import styles from '../../constants/styles'


export default function FolderSettingsButton() {
  const route = useRoute<RootStackScreenProps<'Scene'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'Scene'>['navigation']>()
  const scene = route.params.scene

  return (
    <Pressable
      onPress={() => {
        navigation.push('EditScene', {scene})
      }}
      style={({pressed}) => [
        styles.buttonLike,
        pressed ? styles.buttonLikePressed : null
      ]}
      >
      {/* <MaterialCommunityIcon
        name='sawtooth-wave'
        size={40}
        adjustsFontSizeToFit={true}
        /> */}
      <Text
        style={{color: '#000'}}>
          Lotono
      </Text>
    </Pressable>
  )
}
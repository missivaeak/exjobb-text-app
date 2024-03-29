import { useRoute, useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import type { RootStackScreenProps, RootStackNavigationProp } from '../../navigation/types'


export default function FolderSettingsButton() {
  const route = useRoute<RootStackScreenProps<'Folder'>['route']>()
  const navigation = useNavigation<RootStackScreenProps<'Folder'>['navigation']>()
  const folder = route.params.folder

  return (
    <Pressable
      onPress={() => {
        navigation.push('EditFolder', {folder})
      }}
      >
      <MaterialCommunityIcon
        name='folder-cog-outline'
        size={40}
        adjustsFontSizeToFit={true}
        />
    </Pressable>
  )
}
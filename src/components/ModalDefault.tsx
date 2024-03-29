import { useCallback, useState } from 'react'
import { Text, View, Modal, StyleSheet, Pressable } from "react-native"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from '../constants/styles'

export default function ModalDefault({children, setModalOpen}: {
  children: React.ReactNode,
  setModalOpen: (modalOpen: boolean) => void
}) {
  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <Modal
      style={componentStyles.container}
      animationType='slide'
      transparent={true}
      visible={true}
      >
        <View
          style={componentStyles.modal}
          >
            {children}
            <Pressable
              style={({pressed}) => [
                styles.buttonLike,
                pressed ? styles.buttonLikePressed : null,
                componentStyles.closeButton
              ]}
              onPress={closeModal}
              >
              <Text
                style={{fontSize: 20}}
                >
                Miq
              </Text>
              {/* // <MaterialCommunityIcon
              //   style={{
              //     color: '#000000'
              //   }}
              //   name="shoe-ballet"
              //   size={40}
              //   /> */}
            </Pressable>
        </View>
    </Modal>
  )
}

const componentStyles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // transform: [
    //   {translateX: }
    // ]
  },
  modal: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffffee',
    marginHorizontal: 50,
    marginVertical: 100,
    borderRadius: 10,
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: [
      { translateX: 10 },
      { translateY: -10 }
    ]
  }
})

import React, { useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  Pressable,
  Dimensions,
  PanResponder,
} from 'react-native'
import { useTheme } from '../theme/ThemeContext'


const { height } = Dimensions.get('window')
const SHEET_HEIGHT = height * 0.35

const BottomSheet = ({ visible, onClose, children }) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current


  // ---------- Open and Close animation Bouncy Effect ----------
  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : SHEET_HEIGHT,
      damping: 14,
      stiffness: 160,
      mass: 0.9,
      useNativeDriver: true,
    }).start()
  }, [visible, translateY])

  // ---------- Gesture handling ----------
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dy) > 5,

      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy)
        }
      },

      onPanResponderRelease: (_, gesture) => {
        const shouldClose =
          gesture.dy > SHEET_HEIGHT * 0.25 || gesture.vy > 1.2

        Animated.spring(translateY, {
          toValue: shouldClose ? SHEET_HEIGHT : 0,
          velocity: gesture.vy,
          damping: 22,
          stiffness: 200,
          mass: 0.9,
          useNativeDriver: true,
        }).start(() => {
          if (shouldClose) onClose()
        })
      },
    })
  ).current

  if (!visible) return null

  return (
    <Modal transparent animationType="none">
      <Pressable style={styles.backdrop} onPress={onClose} />

      <Animated.View
        style={[
          styles.sheet,
          { transform: [{ translateY }] },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </Modal>
  )
}

export default BottomSheet

const createStyles = (theme) => StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: SHEET_HEIGHT,
    backgroundColor: theme.surface,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.border,
    alignSelf: 'center',
    marginBottom: 12,
  },
})


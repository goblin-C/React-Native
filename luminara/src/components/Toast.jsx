// src/components/Toast.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Text, StyleSheet, Animated, Dimensions } from 'react-native'
import colors from '../constants/colors'

const { width } = Dimensions.get('window')

let toastTimer

export const Toast = ({ message, type = 'primary', duration = 3000, onHide }) => {
  const [visible, setVisible] = useState(false)

  // Animated translateY value
  const translateY = useMemo(() => new Animated.Value(100), [])

  useEffect(() => {
    if (message) {
      setVisible(true)

      // Slide in animation
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()

      // Auto-hide after duration
      toastTimer = setTimeout(() => {
        Animated.timing(translateY, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setVisible(false)
          onHide && onHide()
        })
      }, duration)
    }

    return () => clearTimeout(toastTimer)
  }, [message, duration, translateY, onHide])

  if (!visible || !message) return null

  // Pick background color based on type
  const backgroundColor = colors[type] || colors.primary

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], backgroundColor }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: width * 0.9,
    padding: 14,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

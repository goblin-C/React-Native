import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native'
import { useTheme } from '../theme/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const animValue = useRef(new Animated.Value(theme.mode === 'dark' ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: theme.mode === 'dark' ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }, [theme.mode])

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 44],
  })

  return (
    <TouchableOpacity onPress={toggleTheme} activeOpacity={0.8}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.toggleBg },
        ]}
      >
        <Animated.View
          style={[
            styles.knob,
            {
              backgroundColor: theme.toggleKnob,
              transform: [{ translateX }],
            },
          ]}
        />
        <Text style={[styles.text, { color: theme.toggleText }]}>
          {theme.mode === 'dark' ? '' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 32,
    borderRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  knob: {
    width: 18,
    height: 18,
    borderRadius: 18,
  },
  text: {
    position: 'absolute',
    alignSelf: 'end',
    fontSize: 12,
  },
})

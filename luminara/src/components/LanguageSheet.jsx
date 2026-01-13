import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BottomSheet from './BottomSheet'
import { setLanguage } from '../utils/languageGenerator'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
]

export default function LanguageSheet({ visible, onClose }) {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      {LANGUAGES.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={styles.item}
          onPress={() => {
            setLanguage(lang.code)
            onClose()
          }}
        >
          <Text style={styles.text}>{lang.label}</Text>
        </TouchableOpacity>
      ))}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
})

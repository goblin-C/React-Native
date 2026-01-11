import React from 'react'
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import BottomSheet from './BottomSheet'
import colors from '../constants/colors'

const COUNTRIES = [
  { code: '+91', label: 'India' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
  { code: '+61', label: 'Australia' },
]

const PhoneInput = ({ visible, onClose, onSelect }) => {
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <FlatList
        data={COUNTRIES}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              onSelect(item.code)
              onClose()
            }}
          >
            <Text style={styles.code}>{item.code}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </BottomSheet>
  )
}

export default PhoneInput

const styles = StyleSheet.create({
  item: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  code: {
    fontWeight: 'bold',
    marginRight: 12,
    color: colors.textPrimary,
  },
  label: {
    color: colors.textSecondary,
  },
})

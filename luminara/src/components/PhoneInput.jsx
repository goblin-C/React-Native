import React from 'react'
import { Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import BottomSheet from './BottomSheet'
import { useTheme } from '../theme/ThemeContext'


const COUNTRIES = [
  { code: '+91', label: 'India' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
  { code: '+61', label: 'Australia' },
]

const PhoneInput = ({ visible, onClose, onSelect }) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
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

const createStyles = (theme) => StyleSheet.create({
  item: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  code: {
    fontWeight: 'bold',
    marginRight: 12,
    color: theme.textPrimary,
  },
  label: {
    color: theme.textSecondary,
  },
})

export default PhoneInput


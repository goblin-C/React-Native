import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import BottomSheet from './BottomSheet'
import { useTheme } from '../theme/ThemeContext'
import { useLanguage } from '../theme/LanguageContext'


const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
]

export default function LanguageSheet({ visible, onClose }) {
  const { theme } = useTheme()
  const { changeLanguage } = useLanguage()
  const styles = createStyles(theme)

  return (

    <BottomSheet visible={visible} onClose={onClose}>
      {LANGUAGES.map(lang => (
        <TouchableOpacity
          key={lang.code}
          style={styles.item}
          onPress={() => {
            changeLanguage(lang.code)
            onClose()
          }}

        >
          <Text style={styles.text}>{lang.label}</Text>
        </TouchableOpacity>
      ))}
    </BottomSheet>
  )
}

const createStyles = (theme) => StyleSheet.create({
  item: {
    padding: 16,
  },
  text: {
    fontSize: 16,
    color: theme.textPrimary,
  },
})


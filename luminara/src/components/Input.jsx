// src/components/CustomInput.jsx
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Eye from '../assets/icons/eye.svg'
import EyeOff from '../assets/icons/eye-off.svg'
import { useTheme } from '../theme/ThemeContext'


const Input = ({
  value,
  onChangeText,
  placeholder,
  secure = false,
  keyboardType = 'default',
  maxLength,
  style,
  editable = true,
  inputStyle,
}) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  return (
    <View style={[styles.container, focused && styles.focused, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}

        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize="none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={maxLength}
        editable={editable}
      />
      {secure && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          {showPassword ? (
            <EyeOff width={24} height={24} fill={theme.textSecondary} />
          ) : (
            <Eye width={24} height={24} fill={theme.textSecondary} />
          )}

        </TouchableOpacity>
      )}
    </View>
  )
}

export default Input

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    flex: 1,
    backgroundColor: theme.surface,
  },
  focused: {
    borderColor: theme.primary,
  },
  input: {
    flex: 1,
    height: 48,
    color: theme.textPrimary,
  },
  eyeIcon: {
    padding: 8,
  },
})


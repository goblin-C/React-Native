// src/components/CustomInput.jsx
import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Eye from '../assets/icons/eye.svg'
import EyeOff from '../assets/icons/eye-off.svg'
import colors from '../constants/colors'

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
  const [focused, setFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[styles.container, focused && styles.focused, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
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
            <EyeOff width={24} height={24} fill={colors.textSecondary} />
          ) : (
            <Eye width={24} height={24} fill={colors.textSecondary} />
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    flex: 1,
  },
  focused: {
    borderColor: colors.primary,
  },
  input: {
    flex: 1,
    height: 48,
    color: colors.textPrimary,
  },
  eyeIcon: {
    padding: 8,
  },
})

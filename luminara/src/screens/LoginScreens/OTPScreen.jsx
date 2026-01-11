import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import colors from '../../constants/colors'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import { confirmSignUp, resendSignUp } from '../../services/Auth/auth'
import { Toast } from '../../components/Toast'

const NUM_DIGITS = 6

const OTPScreen = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { username } = route.params || {}

  const [toastData, setToastData] = useState({ message: '', type: 'primary' })
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const showToast = ({ message, type = 'primary' }) => {
    setToastData({ message, type })
    // Auto-hide after 3s
    setTimeout(() => setToastData({ message: '', type: 'primary' }), 3000)
  }

  const handleConfirm = async () => {
    if (!username) {
      showToast({ message: 'Username missing. Please sign up again', type: 'error' })
      navigation.replace('SignUp')
      return
    }

    if (code.length !== NUM_DIGITS) {
      showToast({ message: `Enter ${NUM_DIGITS}-digit code`, type: 'warning' })
      return
    }

    try {
      setLoading(true)
      await confirmSignUp(username, code)
      showToast({ message: 'Account verified successfully', type: 'success' })
      navigation.replace('Home')
    } catch (error) {
      showToast({ message: error.message || 'Verification failed', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (digit) => {
    if (digit === 'back') {
      setCode(code.slice(0, -1))
    } else if (code.length < NUM_DIGITS) {
      setCode(code + digit)
    }
  }

  const renderOTPBoxes = () => {
    const digits = code.split('')
    return Array(NUM_DIGITS)
      .fill('')
      .map((_, idx) => (
        <View key={idx} style={styles.otpBox}>
          <Text style={styles.otpText}>{digits[idx] || ''}</Text>
        </View>
      ))
  }

  const renderKeypad = () => {
    const keys = [
      ['1','2','3'],
      ['4','5','6'],
      ['7','8','9'],
      ['back','0','Done'],
    ]

    return keys.map((row, i) => (
      <View key={i} style={styles.keyRow}>
        {row.map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.keyButton}
            onPress={() => {
              if (key === 'Done') handleConfirm()
              else handleKeyPress(key)
            }}
          >
            <Text style={styles.keyText}>
              {key === 'back' ? '⌫' : key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ))
  }
  const handleResend = async () => {
    if (!username) {
      showToast({ message: 'Username missing. Please sign up again', type: 'error' })
      navigation.replace('SignUp')
      return
    }

    try {
      setLoading(true)
      await resendSignUp(username)
      showToast({ message: 'OTP resent successfully', type: 'info' })
    } catch (error) {
      showToast({ message: error.message || 'Failed to resend OTP', type: 'error' })
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={[globalStyles.screenContainer, styles.container]}>
      <Text style={styles.title}>Enter Verification Code</Text>

      <Text style={styles.subtitle}>
        We have sent OTP to your email
      </Text>

      <View style={styles.otpContainer}>{renderOTPBoxes()}</View>

      <TouchableOpacity style={{ marginVertical: 12 }} onPress={handleResend}>
        <Text style={styles.resendText}>
          Don’t receive a OTP? <Text style={styles.resendLink}>Resend OTP</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.keypad}>{renderKeypad()}</View>

      {/* Toast Component */}
      <Toast
        message={toastData.message}
        type={toastData.type}
        onHide={() => setToastData({ message: '', type: 'primary' })}
      />
    </View>
  )
}

export default OTPScreen

const styles = StyleSheet.create({
  container: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...fontStyles.bold,
    ...fontStyles.h1,
    color: colors.textPrimary,
    marginVertical: 12,
  },
  subtitle: {
    ...fontStyles.body,
    color: colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  otpText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  resendText: {
    ...fontStyles.body,
    color: colors.textSecondary,
  },
  resendLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  keypad: {
    marginTop: 16,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  keyButton: {
    width: 90,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

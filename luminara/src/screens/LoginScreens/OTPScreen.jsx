import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useRoute, useNavigation } from '@react-navigation/native'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import { confirmSignUp, resendSignUp } from '../../services/Auth/auth'
import { Toast } from '../../components/Toast'
import { useTheme } from '../../theme/ThemeContext'
import { PasteIcon } from '../../styles/icons'
import Loader from '../../components/Loader'

const NUM_DIGITS = 6

const OTPScreen = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
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

  const handleKeyPress = (key) => {
    if (key === '⌫' || key === 'Back') {
      setCode(code.slice(0, -1))
    } else if (key === 'Clear') {
      setCode('')
    } else if (code.length < NUM_DIGITS && /^\d$/.test(key)) {
      setCode(code + key)
    }
  }


  const handlePaste = async () => {
    try {
      if (!Clipboard || typeof Clipboard.getString !== 'function') {
        showToast({ message: 'Clipboard paste not supported in this environment', type: 'error' })
        return
      }
      const text = await Clipboard.getString()
      const cleanText = text?.trim()
      if (/^\d{6}$/.test(cleanText)) {
        setCode(cleanText)
        showToast({ message: 'Code pasted successfully', type: 'success' })
      } else {
        showToast({ message: 'Invalid code in clipboard. Must be 6 digits.', type: 'warning' })
      }
    } catch (error) {
      console.error('Clipboard error:', error)
      showToast({ message: 'Failed to access clipboard', type: 'error' })
    }
  }



  const Cursor = ({ theme }) => {
    const opacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      )
      animation.start()
      return () => animation.stop()
    }, [])

    return (
      <Animated.View
        style={[
          styles.cursor,
          { opacity, backgroundColor: theme.primary },
        ]}
      />
    )
  }

  const renderOTPBoxes = () => {
    const digits = code.split('')
    return Array(NUM_DIGITS)
      .fill('')
      .map((_, idx) => {
        const isCurrentSlot = idx === code.length
        return (
          <View key={idx} style={styles.otpBox}>
            {isCurrentSlot ? (
              <Cursor theme={theme} />
            ) : (
              <Text style={styles.otpText}>{digits[idx] || ''}</Text>
            )}
          </View>
        )
      })
  }


  const renderKeypad = () => {
    const keys = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['Clear', '0', '⌫'],
    ]

    return keys.map((row, i) => (
      <View key={i} style={styles.keyRow}>
        {row.map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.keyButton}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={[
              styles.keyText,
              key === 'Clear' && styles.clearKeyText
            ]}>
              {key}
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

      <View style={styles.otpWrapper}>
        <View style={styles.otpContainer}>{renderOTPBoxes()}</View>
        <TouchableOpacity style={styles.pasteButton} onPress={handlePaste}>
          <PasteIcon color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
        <Text style={styles.resendText}>
          Don’t receive a OTP? <Text style={styles.resendLink}>Resend OTP</Text>
        </Text>
      </TouchableOpacity>


      <View style={styles.keypad}>{renderKeypad()}</View>

      <TouchableOpacity
        style={[styles.verifyButton, loading && styles.disabledButton]}
        onPress={handleConfirm}
        disabled={loading}
      >
        <Text style={styles.verifyButtonText}>
          {loading ? <Loader /> : 'Verify OTP'}
        </Text>
      </TouchableOpacity>


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
const createStyles = (theme) => StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  title: {
    ...fontStyles.bold,
    ...fontStyles.h1,
    color: theme.textPrimary,
    marginVertical: 12,
  },
  subtitle: {
    ...fontStyles.body,
    color: theme.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  otpWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: theme.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: theme.surface,
  },
  otpText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  cursor: {
    width: 2,
    height: 24,
  },
  pasteButton: {
    marginLeft: 12,
    padding: 8,
  },
  resendText: {
    ...fontStyles.body,
    color: theme.textSecondary,
  },
  resendLink: {
    color: theme.primary,
    ...fontStyles.bold,
  },
  keypad: {
    marginTop: 24,
    width: '100%',
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  keyButton: {
    width: 100,
    height: 64,
    borderRadius: 12,
    backgroundColor: theme.mode === 'dark' ? theme.surface : '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  keyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.textPrimary,
  },
  resendButton: {
    marginVertical: 16,
  },
  verifyButton: {
    width: '100%',
    height: 56,
    backgroundColor: theme.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    ...fontStyles.bold,
  },
  disabledButton: {
    opacity: 0.6,
  },
  clearKeyText: {
    fontSize: 16,
    color: theme.error || '#FF4444',
  },
})




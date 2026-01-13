import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { generateUsername } from 'unique-username-generator'

// SVG
import AccountSvg from '../../assets/icons/account-details.svg'

// Components
import Input from '../../components/Input'
import PhoneInput from '../../components/PhoneInput'
import { Toast } from '../../components/Toast'
import Loader from '../../components/Loader'


import colors from '../../constants/colors'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import { signUp } from '../../services/Auth/auth'

const SignUpScreen = () => {
  const navigation = useNavigation()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+91',
  })

  const [loading, setLoading] = useState(false)
  const [sheetVisible, setSheetVisible] = useState(false)
  const [toastData, setToastData] = useState({ message: '', type: 'primary' })

  const showToast = ({ message, type = 'primary' }) => {
    setToastData({ message, type })
    // Auto-hide after 3s
    setTimeout(() => setToastData({ message: '', type: 'primary' }), 3000)
  }

  const handleChange = (key, value) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const isValidPhoneNumber = phoneNumber =>
    /^\d{9,15}$/.test(phoneNumber) // Adjust length as needed

  const handleSignUp = async () => {
    const { firstName, email, phoneNumber, countryCode } = form
    let { lastName } = form
    if (!lastName) lastName = '.'

    // Validation
    if (!firstName || !email || !phoneNumber) {
      showToast({ message: 'Please fill all fields', type: 'error' })
      return
    }

    if (!validateEmail(email)) {
      showToast({ message: 'Invalid email', type: 'error' })
      return
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      showToast({ message: 'Invalid phone number', type: 'error' })
      return
    }

    try {
      setLoading(true)
      // const username = 'Admin'
      const username = generateUsername()

      await signUp({
        firstName,
        lastName,
        email,
        phoneNumber: `${countryCode}${phoneNumber}`,
        username,
      })

      showToast({ message: 'Account created successfully', type: 'success' })

      // Navigate to OTP screen
      navigation.replace('OTP', { username })
    } catch (error) {
      console.error(error)
      showToast({ message: error.message || 'Sign Up failed', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}


      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[globalStyles.screenContainer, styles.container]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <AccountSvg width={50} height={50} style={styles.topIcon} />
        <Text style={styles.title}>Create Account</Text>

        {/* Basic Details */}
        <View style={styles.row}>
          <Input
            placeholder="First Name"
            value={form.firstName}
            onChangeText={v => handleChange('firstName', v)}
            maxLength={15}
            style={styles.firstNameInput}

          />
          <Input
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={v => handleChange('lastName', v)}
            maxLength={15}
          />
        </View>

        {/* Email */}
        <View style={styles.row}>
          <Input
            placeholder="Email"
            value={form.email}
            onChangeText={v => handleChange('email', v)}
            keyboardType="email-address"
            maxLength={48}
          />
        </View>

        {/* Phone input with country picker */}
        <View style={styles.phoneRow}>
          <TouchableOpacity
            style={styles.countryBox}
            onPress={() => setSheetVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.countryCode}>{form.countryCode}</Text>
          </TouchableOpacity>

          <View style={styles.phoneBox}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone Number"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
              value={form.phoneNumber}
              onChangeText={v => handleChange('phoneNumber', v)}
              maxLength={15}
            />
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.disabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? <Loader /> : 'Sign Up'}
          </Text>

        </TouchableOpacity>
      </ScrollView>

      {/* Country Code Bottom Sheet */}
      <PhoneInput
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onSelect={code => handleChange('countryCode', code)}
      />

      {/* Toast Component */}
      <Toast
        message={toastData.message}
        type={toastData.type}
        onHide={() => setToastData({ message: '', type: 'primary' })}
      />
    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  firstNameInput: {
    marginRight: 8,
  },
  lottie: {
    width: '90%',
    height: '10%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  topIcon: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    ...fontStyles.bold,
    ...fontStyles.h1,
    color: colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  countryBox: {
    height: 48,
    minWidth: 70,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: colors.background,
  },
  countryCode: {
    marginRight: 8,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  phoneBox: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.background,
  },
  phoneInput: {
    color: colors.textPrimary,
    fontSize: 16,
    padding: 0,
  },
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '50%',
    alignSelf: 'center',
  },
  buttonText: {
    ...fontStyles.bold,
    color: colors.white,
  },
  disabled: {
    opacity: 0.6,
  },
})

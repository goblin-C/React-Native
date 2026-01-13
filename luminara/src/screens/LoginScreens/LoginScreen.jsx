import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { CommonActions, useNavigation } from '@react-navigation/native'

import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import { signIn } from '../../services/Auth/auth'
import { saveSession } from '../../services/Auth/session'
import { useTheme } from '../../theme/ThemeContext'


// SVG
import AccountSvg from '../../assets/icons/account.svg'

// Components
import Input from '../../components/Input'
import { Toast } from '../../components/Toast'
import Loader from '../../components/Loader'

const LoginScreen = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [toastData, setToastData] = useState({ message: '', type: 'primary' })


  const showToast = ({ message, type = 'primary' }) => {
    setToastData({ message, type })
    setTimeout(() => setToastData({ message: '', type: 'primary' }), 3000)
  }

  const handleLogin = async () => {
    if (!username || !password) {
      showToast({ message: 'Please enter username and password', type: 'error' })
      return
    }

    try {
      setLoading(true)
      const session = await signIn(username, password)
      await saveSession({
        idToken: session.getIdToken().getJwtToken(),
        accessToken: session.getAccessToken().getJwtToken(),
        refreshToken: session.getRefreshToken().getToken(),
      })
      showToast({ message: 'Logged in successfully', type: 'success' })
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      )
    } catch (error) {
      console.error(error)
      showToast({ message: error.message || 'Invalid username or password', type: 'error' })
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
        <Text style={styles.title}>Login</Text>
        <View style={styles.row}>
          {/* Username Input */}
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            maxLength={32}
            style={styles.usernameInput}

          />
        </View>
        <View style={styles.row}>
          {/* Password Input */}
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secure
            maxLength={32}
          />
        </View>
        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <Loader width={40} height={40} />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>


        {/* Sign Up Link */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Toast Component */}
      <Toast
        message={toastData.message}
        type={toastData.type}
        onHide={() => setToastData({ message: '', type: 'primary' })}
      />
    </KeyboardAvoidingView>
  )

}

const createStyles = (theme) => StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: theme.background,
  },
  usernameInput: {
    marginBottom: 8,
    width: '80%',
  },
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  topIcon: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    ...fontStyles.bold,
    ...fontStyles.h1,
    color: theme.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginLeft: 96,
  },
  button: {
    height: 48,
    backgroundColor: theme.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: '60%',
    marginLeft: 96,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    ...fontStyles.bold,
    color: theme.textOnPrimary,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: theme.textSecondary,
  },
  signupLink: {
    color: theme.primary,
    ...fontStyles.bold,
  },
})

export default LoginScreen


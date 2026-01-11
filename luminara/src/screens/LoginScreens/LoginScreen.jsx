import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import colors from '../../constants/colors'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import { signIn } from '../../services/Auth/auth'
import { saveSession } from '../../services/Auth/session'

// SVG
import AccountSvg from '../../assets/icons/account.svg'

// Components
import Input from '../../components/Input'
import { Toast } from '../../components/Toast'

const LoginScreen = () => {
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
      navigation.replace('Home')
    } catch (error) {
      console.error(error)
      showToast({ message: error.message || 'Invalid username or password', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={[globalStyles.screenContainer, styles.container]}>
      <AccountSvg width={50} height={50} style={styles.topIcon} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.row}>
        {/* Username Input */}
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          maxLength={32}
          style={{ marginBottom: 8, width: '80%'}}
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
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {/* Toast Component */}
      <Toast
        message={toastData.message}
        type={toastData.type}
        onHide={() => setToastData({ message: '', type: 'primary' })}
      />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
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
    color: colors.textPrimary,
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
    backgroundColor: colors.primary,
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
    color: colors.white,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  signupText: {
    color: colors.textSecondary,
  },
  signupLink: {
    color: colors.primary,
    ...fontStyles.bold,
  },
})

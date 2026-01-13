import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native'
import colors from '../../constants/colors'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import { clearSession } from '../../services/Auth/session'
import { useNavigation } from '@react-navigation/native'
import { globalSignOut, getCurrentUserAttributes } from '../../services/Auth/auth'
import { ENVIRONMENT } from '@env'
import Lottie from 'lottie-react-native';
import profile from '../../assets/lottie/profile.json';
import Loader from '../../components/Loader'
import { Toast } from '../../components/Toast'



export default function ProfileScreen() {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [toastData, setToastData] = useState({ message: '', type: 'primary' })

  const showToast = ({ message, type = 'primary' }) => {
    setToastData({ message, type })
    // Auto-hide after 3s
    setTimeout(() => setToastData({ message: '', type: 'primary' }), 3000)
  }


  useEffect(() => {
    const loadUser = async () => {
      try {
        const attributes = await getCurrentUserAttributes()

        if (!attributes) {
          showToast({ message: 'Session Error: Could not retrieve user details. Logging out.', type: 'error' })
          setTimeout(handleLogout, 2000)
          return
        }

        setUser({
          username: attributes?.username || '',
          firstName: attributes?.given_name || '',
          lastName: attributes?.family_name || '',
          email: attributes?.email || '',
          phone: attributes?.phone_number || '',
        })
      } catch (error) {
        console.error('Failed to load user attributes', error)
        showToast({ message: 'Failed to fetch profile. Logging out.', type: 'error' })
        setTimeout(handleLogout, 2000)
      }

    }

    loadUser()
  }, [])

  const handleLogout = async () => {
    try {
      await globalSignOut()
      await clearSession()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    } catch (error) {
      showToast({ message: error.message || 'Logout Failed', type: 'error' })
    }
  }


  if (!user) {
    return (
      <View style={[globalStyles.screenContainer, styles.center]}>
        <Text style={styles.lottie}>
          <Loader />
        </Text>
        <TouchableOpacity
          style={styles.loadingLogoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Logout</Text>
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

  return (
    <View style={[globalStyles.screenContainer, styles.container]}>
      {/* Profile */}
      <Lottie
        source={profile}
        style={styles.lottie}
        autoPlay
        loop
      />
      {/* Username */}
      <Text style={styles.username}>{user?.username}</Text>
      <Text style={styles.username}>{ENVIRONMENT}</Text>

      {/* Basic Details */}
      <View style={styles.card}>
        <ProfileRow label="First Name" value={user.firstName} />
        <ProfileRow label="Last Name" value={user.lastName} />
        <ProfileRow label="Email" value={user.email} />
        <ProfileRow label="Phone" value={user.phone} />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
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

const ProfileRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  lottie: {
    width: '90%',
    height: '10%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    ...fontStyles.bold,
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: 24,
  },
  card: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    elevation: 3,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    ...fontStyles.regular,
    color: colors.textSecondary,
    fontSize: 12,
  },
  value: {
    ...fontStyles.bold,
    color: colors.textPrimary,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.white,
    ...fontStyles.bold,
    fontSize: 16,
  },
})

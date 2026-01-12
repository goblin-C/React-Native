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
// Icons
import ManIcon from '../../assets/icons/man.svg'
import WomanIcon from '../../assets/icons/woman.svg'

export default function ProfileScreen() {
  const navigation = useNavigation()
  const [user, setUser] = useState(null)
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [focused, setFocused] = useState(true) // For animation switch

  useEffect(() => {
    const loadUser = async () => {
      try {
        const attributes = await getCurrentUserAttributes()
        if (!attributes) return

        setUser({
          username: attributes.username,
          firstName: attributes.given_name,
          lastName: attributes.family_name,
          email: attributes.email,
          phone: attributes.phone_number,
        })
      } catch (error) {
        console.error('Failed to load user attributes', error)
      }
    }

    loadUser()
  }, [])

  // Animate icon switch every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start()

      setFocused(prev => !prev)
    }, 4000)

    return () => clearInterval(interval)
  }, [fadeAnim])

  const handleLogout = async () => {
    try {
      await globalSignOut()
      await clearSession()
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    } catch (error) {
      Alert.alert('Logout Failed', error.message || 'Something went wrong')
    }
  }

  if (!user) {
    return (
      <View style={[globalStyles.screenContainer, styles.center]}>
        <Text>Loading profile</Text>
      </View>
    )
  }

  return (
    <View style={[globalStyles.screenContainer, styles.container]}>
      {/* Animated Icon */}
      <Animated.View style={{ opacity: fadeAnim, marginBottom: 16 }}>
        {focused ? (
          <ManIcon width={120} height={120} fill={colors.primary} />
        ) : (
          <WomanIcon width={120} height={120} fill={colors.primary} />
        )}
      </Animated.View>

      {/* Username */}
      <Text style={styles.username}>{user.username}</Text>
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

import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
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
import { useTheme } from '../../theme/ThemeContext'
import { useLanguage } from '../../theme/LanguageContext'
import ThemeToggle from '../../components/ThemeToggle'
import LanguageSheet from '../../components/LanguageSheet'
import i18n from '../../utils/languageGenerator'





export default function ProfileScreen() {
  const { theme } = useTheme()
  const { locale } = useLanguage()
  const styles = createStyles(theme)

  const navigation = useNavigation()

  const [user, setUser] = useState(null)
  const [langVisible, setLangVisible] = useState(false)
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
        <View style={styles.loaderContainer}>
          <Loader width={100} height={100} />
        </View>

        <TouchableOpacity
          style={styles.loadingLogoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>{i18n.t('logout')}</Text>
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

      <View style={styles.card}>
        <ProfileRow label={i18n.t('firstName')} value={user.firstName} styles={styles} />
        <ProfileRow label={i18n.t('lastName')} value={user.lastName} styles={styles} />
        <ProfileRow label={i18n.t('email')} value={user.email} styles={styles} />
        <ProfileRow label={i18n.t('phone')} value={user.phone} styles={styles} />
      </View>

      <View style={styles.card}>
        <ProfileRow label={i18n.t('theme')} value={<ThemeToggle />} styles={styles} />
        <TouchableOpacity onPress={() => setLangVisible(true)}>
          <ProfileRow
            label={i18n.t('language')}
            value={locale === 'hi' ? 'हिंदी' : 'English'}
            styles={styles}
          />
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{i18n.t('logout')}</Text>
      </TouchableOpacity>

      <LanguageSheet
        visible={langVisible}
        onClose={() => setLangVisible(false)}
      />


      {/* Toast Component */}
      <Toast
        message={toastData.message}
        type={toastData.type}
        onHide={() => setToastData({ message: '', type: 'primary' })}
      />
    </View>

  )
}

const ProfileRow = ({ label, value, styles }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    {typeof value === 'string' ? (
      <Text style={styles.value}>{value}</Text>
    ) : (
      value
    )}
  </View>
)

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: theme.background,
  },
  loaderContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: '90%',
    height: '10%',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  username: {
    ...fontStyles.bold,
    fontSize: 24,
    color: theme.textPrimary,
    marginBottom: 10,
  },
  card: {
    width: '90%',
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  row: {
    marginBottom: 12,
  },
  label: {
    ...fontStyles.regular,
    color: theme.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    ...fontStyles.bold,
    color: theme.textPrimary,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: theme.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  loadingLogoutButton: {
    backgroundColor: theme.primary,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: theme.textOnPrimary,
    ...fontStyles.bold,
    fontSize: 16,
  },
})


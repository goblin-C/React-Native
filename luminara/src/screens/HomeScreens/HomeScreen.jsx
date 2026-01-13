import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import Loader from '../../components/Loader'
import { getSession } from '../../services/Auth/session'
import { useTheme } from '../../theme/ThemeContext'
import { useLanguage } from '../../theme/LanguageContext'
import i18n from '../../utils/languageGenerator'



const HomeScreen = () => {
  const { theme } = useTheme()
  const { locale } = useLanguage()
  const styles = createStyles(theme)

  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await getSession()
        setSession(storedSession)
      } catch (err) {
        console.error('Failed to load session', err)
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [])

  return (
    <ScrollView contentContainerStyle={[globalStyles.screenContainer, styles.container]}>
      {loading && (
        <View style={styles.loaderContainer}>
          <Loader width={100} height={100} />
        </View>
      )}


      <Text style={styles.title}>{i18n.t('hello') || 'Hello'}</Text>
      <Text style={styles.subtitle}>{i18n.t('welcome') || 'Welcome to Luminara ✨'}</Text>


      {!loading && !session && (
        <Text style={styles.error}>No session found</Text>
      )}

      {!loading && session && (
        <View style={styles.tokenBox}>
          <Text style={styles.tokenTitle}>Stored Tokens</Text>

          <Text style={styles.label}>ID Token</Text>
          <Text style={styles.token}>{session.idToken}</Text>

          <Text style={styles.label}>Access Token</Text>
          <Text style={styles.token}>{session.accessToken}</Text>

          <Text style={styles.label}>Refresh Token</Text>
          <Text style={styles.token}>{session.refreshToken}</Text>
        </View>
      )}
    </ScrollView>
  )
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  loaderContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    ...fontStyles.bold,
    ...fontStyles.h1,
    color: theme.textPrimary,
  },
  subtitle: {
    ...fontStyles.regular,
    ...fontStyles.body,
    color: theme.textSecondary,
    marginTop: 8,
  },
  info: {
    marginTop: 16,
    color: theme.textSecondary,
  },
  error: {
    marginTop: 16,
    color: theme.error,
  },
  tokenBox: {
    marginTop: 24,
    width: '100%',
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
  },
  tokenTitle: {
    ...fontStyles.bold,
    marginBottom: 12,
    color: theme.textPrimary,
  },
  label: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 8,
  },
  token: {
    fontSize: 12,
    color: theme.textPrimary,
  },
})

export default HomeScreen


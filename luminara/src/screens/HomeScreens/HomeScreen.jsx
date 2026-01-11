import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import colors from '../../constants/colors'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'

import { getSession } from '../../services/Auth/session'

const HomeScreen = () => {
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
      <Text style={styles.title}>Hello</Text>
      <Text style={styles.subtitle}>Welcome to Luminara ✨</Text>

      {loading && <Text style={styles.info}>Loading session...</Text>}

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

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    ...fontStyles.bold,
    ...fontStyles.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...fontStyles.regular,
    ...fontStyles.body,
    color: colors.textSecondary,
    marginTop: 8,
  },
  info: {
    marginTop: 16,
    color: colors.textSecondary,
  },
  error: {
    marginTop: 16,
    color: colors.error,
  },
  tokenBox: {
    marginTop: 24,
    width: '100%',
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
  },
  tokenTitle: {
    ...fontStyles.bold,
    marginBottom: 12,
    color: colors.textPrimary,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
  },
  token: {
    fontSize: 12,
    color: colors.textPrimary,
  },
})

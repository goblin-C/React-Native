import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'
import { useTheme } from '../../theme/ThemeContext'


import { clearSession } from '../../services/Auth/session'
import { globalSignOut } from '../../services/Auth/auth'

const LogoutScreen = () => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
  const navigation = useNavigation()


  useEffect(() => {
    const logout = async () => {
      try {
        await globalSignOut()

        await clearSession()
      } catch (error) {

      } finally {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        )
      }
    }

    logout()
  }, [navigation])

  return (
    <View style={[globalStyles.screenContainer, styles.container]}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text style={styles.text}>Logging out.</Text>
    </View>

  )
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  text: {
    marginTop: 16,
    color: theme.textSecondary,
    ...fontStyles.regular,
  },
})

export default LogoutScreen


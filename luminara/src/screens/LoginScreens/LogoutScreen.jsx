import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { CommonActions, useNavigation } from '@react-navigation/native'

import colors from '../../constants/colors'
import fontStyles from '../../constants/fontStyles'
import globalStyles from '../../constants/globalStyles'

import { clearSession } from '../../services/Auth/session'
import { globalSignOut } from '../../services/Auth/auth'

const LogoutScreen = () => {
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
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>Logging out.</Text>
    </View>
  )
}

export default LogoutScreen

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    color: colors.textSecondary,
    ...fontStyles.regular,
  },
})

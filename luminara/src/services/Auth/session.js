import AsyncStorage from '@react-native-async-storage/async-storage'

const TOKEN_KEY = 'LUMINARA_AUTH_SESSION'

export const saveSession = async session => {
  await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(session))
}

export const getSession = async () => {
  const data = await AsyncStorage.getItem(TOKEN_KEY)
  return data ? JSON.parse(data) : null
}

export const clearSession = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY)
}

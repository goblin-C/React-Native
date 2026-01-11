import AsyncStorage from '@react-native-async-storage/async-storage'
import { decode as atob } from 'base-64'

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

const isTokenExpired = token => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export const isSessionValid = async () => {
  const session = await getSession()
  if (!session) return false

  return !isTokenExpired(session.idToken)
}
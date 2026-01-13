import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../constants/colors'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(colors.light)

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem('theme')
      if (saved === 'dark') {
        setTheme(colors.dark)
      } else {
        setTheme(colors.light)
      }
    }
    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const nextTheme =
      theme.mode === 'light' ? colors.dark : colors.light

    setTheme(nextTheme)
    await AsyncStorage.setItem('theme', nextTheme.mode)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider


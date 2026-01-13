import React, { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from '../utils/languageGenerator'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
    const [locale, setLocale] = useState(i18n.locale)

    useEffect(() => {
        const loadLang = async () => {
            const saved = await AsyncStorage.getItem('lang')
            if (saved) {
                i18n.locale = saved
                setLocale(saved)
            }
        }
        loadLang()
    }, [])

    const changeLanguage = async (lang) => {
        i18n.locale = lang
        setLocale(lang)
        await AsyncStorage.setItem('lang', lang)
    }

    return (
        <LanguageContext.Provider value={{ locale, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)

export default LanguageProvider

import { I18n } from 'i18n-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const i18n = new I18n({
  en: {
    profile: 'Profile',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone Number',
    logout: 'Logout',
    theme: 'Theme',
    language: 'Language',
    dark: 'Dark',
    light: 'Light',
  },
  hi: {
    profile: 'प्रोफ़ाइल',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    email: 'ईमेल',
    phone: 'फ़ोन नंबर',
    logout: 'लॉग आउट',
    theme: 'थीम',
    language: 'भाषा',
    dark: 'डार्क',
    light: 'लाइट',
  },
})

i18n.enableFallback = true

export const setLanguage = async lang => {
  i18n.locale = lang
  await AsyncStorage.setItem('lang', lang)
}

export default i18n

import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Splash
import SplashScreen from '../screens/SplashScreen'

// Auth Screens
import LoginScreen from '../screens/LoginScreens/LoginScreen'
import SignUpScreen from '../screens/LoginScreens/SignUpScreen'
import OTPScreen from '../screens/LoginScreens/OTPScreen'
import LogoutScreen from '../screens/LoginScreens/LogoutScreen'

// Tabs
import HomeTabs from './HomeTabs'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />

      <Stack.Screen
        name='SignUp'
        component={SignUpScreen}
        options={{
          headerShown: true,
          title: 'Login',
          headerBackVisible: true,
        }}
      />

      <Stack.Screen name='OTP' component={OTPScreen} />

      <Stack.Screen name='Home' component={HomeTabs} />
      <Stack.Screen name='Logout' component={LogoutScreen}/>
    </Stack.Navigator>
  )
}

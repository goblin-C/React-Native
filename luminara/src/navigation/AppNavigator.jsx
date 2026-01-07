import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Splash Screen
import SplashScreen from '../screens/SplashScreen';

/**
 * Login Screens
 */
import LoginScreen from '../screens/LoginScreens/LoginScreen'
import SignUpScreen from '../screens/LoginScreens/SignUpScreen'
import OTPScreen from '../screens/LoginScreens/OTPScreen'

/**
 * Home Screen
 */
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />

    </Stack.Navigator>
  );
}

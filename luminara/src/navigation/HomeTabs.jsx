import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'

import {
  HomeTabIcon,
  ChatTabIcon,
  ProfileTabIcon,
} from '../styles/icons'

// Screens
import HomeScreen from '../screens/HomeScreens/HomeScreen'
import ChatScreen from '../screens/ChatScreens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen'
import { useTheme } from '../theme/ThemeContext'



const Tab = createBottomTabNavigator()

export default function HomeTabs() {
  const { theme } = useTheme()
  const styles = createStyles(theme)


  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: styles.tabBar,
      }}

    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: props => <HomeTabIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatScreen}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: props => <ChatTabIcon {...props} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: props => <ProfileTabIcon {...props} />,
        }}
      />
    </Tab.Navigator>
  )
}

const createStyles = (theme) => StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 32,
    right: 32,
    height: 60,
    width: '80%',
    borderRadius: 60,
    backgroundColor: theme.surface,
    paddingBottom: 6,
    marginRight: 45,
    marginLeft: 45,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
})



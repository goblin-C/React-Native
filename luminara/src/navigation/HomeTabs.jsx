import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  HomeTabIcon,
  ChatTabIcon,
  ProfileTabIcon,
} from '../styles/icons'

// Screens
import HomeScreen from '../screens/HomeScreens/HomeScreen'
import ChatScreen from '../screens/ChatScreens/ChatScreen'
import ProfileScreen from '../screens/ProfileScreens/ProfileScreen'
import colors from '../constants/colors'


const Tab = createBottomTabNavigator()

export default function HomeTabs() {

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
        },
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

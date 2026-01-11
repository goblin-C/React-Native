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
        position: 'absolute',
        bottom: 16,      
        left: 32,                
        right: 32,                 
        height: 60,
        width: '80%',                
        borderRadius: 60,          
        backgroundColor: colors.white,
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

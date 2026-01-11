import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Animated } from 'react-native';
import { ENVIRONMENT } from '@env'
import { CommonActions } from '@react-navigation/native'

import colors from '../constants/colors';
import globalStyles from '../constants/globalStyles';
import { isSessionValid } from '../services/Auth/session'

const SplashScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    const bootstrap = async () => {
    const isLoggedIn = await isSessionValid()
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: isLoggedIn ? 'Home' : 'Login' }],
        })
      )
    }

    const timer = setTimeout(bootstrap, 2000)

    return () => clearTimeout(timer)
  }, [navigation, opacity])


  return (
    <View style={[globalStyles.screenContainer, globalStyles.center, styles.container]}>
      <StatusBar hidden />

      <Animated.Image
        source={require(`../assets/images/${ENVIRONMENT}_splash.png`)}
        style={[styles.image, { opacity }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  image: {
    width: '120%',
    height: '120%',
  },
});

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Animated } from 'react-native';
import { ENVIRONMENT } from '@env'
import { CommonActions } from '@react-navigation/native'
import Lottie from 'lottie-react-native';

import globalStyles from '../constants/globalStyles';
import { isSessionValid } from '../services/Auth/session'
import { useTheme } from '../theme/ThemeContext'


import devSplash from '../assets/images/dev_splash.png';
import qaSplash from '../assets/images/qa_splash.png';
import prodSplash from '../assets/images/prod_splash.png';

import loading from '../assets/lottie/loading.json';

const splashImages = {
  dev: devSplash,
  qa: qaSplash,
  prod: prodSplash,
};

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme()
  const styles = createStyles(theme)
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

      {/* <Animated.Image
        source={splashImages[ENVIRONMENT]}
        style={[styles.image, { opacity }]}
        resizeMode="contain"
      /> */}

      <Lottie
        source={loading}
        style={styles.lottie}
        autoPlay
        loop
      />

    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
  },
  image: {
    width: '120%',
    height: '120%',
  },
  lottie: {
    width: '70%',
    height: '30%',
    overflow: 'hidden',
  },
});

export default SplashScreen;


import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, StatusBar, Animated } from 'react-native';
import { ENVIRONMENT } from '@env'

import colors from '../constants/colors';
import globalStyles from '../constants/globalStyles';

const SplashScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Fade in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Navigation timer
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

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

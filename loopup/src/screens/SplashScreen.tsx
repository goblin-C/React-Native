import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, Image, Animated, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: Props) => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: 2500,
      useNativeDriver: false,
    }).start(() => navigation.replace('Login'));
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.center}>
      <Image source={require('../assets/images/splash.jpg')} style={styles.logo} />
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width }]} />
      </View>
      <Text style={styles.text}>Welcome — MyApp</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: { width: 160, height: 160, resizeMode: 'contain', marginBottom: 20 },
  progressContainer: {
    width: '80%',
    height: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: { height: '100%', backgroundColor: '#1976D2' },
  text: { marginTop: 12, fontSize: 16, color: '#444' },
});

export default SplashScreen;

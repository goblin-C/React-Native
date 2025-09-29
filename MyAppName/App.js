import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Config } from 'react-native-config';

export default function App() {
  console.log('ENVIRONMENT:', Config.ENVIRONMENT);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: 'black' }}>Open our  {Config.ENVIRONMENT} app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

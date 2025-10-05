import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import { getFontFamily } from './src/utils/fontUtils';

export default function App() {
  const stage = Config.STAGE;

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#900',
          ...getFontFamily({
            font: 'Lato',
            fontSize: 18,
            fontWeight: 'light',
          }),
        }}
      >
        Loop Up in {stage}
      </Text>
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

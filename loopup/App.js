import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import { getFontFamily } from './src/utils/fontUtils';
import { isIOSPlatform } from './src/utils/platformUtils';

export default function App() {
  const stage = Config.STAGE;

  return (
    <View style={styles.container}>
      <Text
        style={{
          width: '75%',
          borderWidth: 1,
          borderColor: 'plum',
          color: '#099',
          textWrap: 'wrap',
          padding: 10,
          ...getFontFamily({
            font: 'Poppins',
            fontSize: 24,
            fontWeight: 'extraLight',
          }),
        }}
      >
        Loop Up in {stage} mode!! for {isIOSPlatform()}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#900',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

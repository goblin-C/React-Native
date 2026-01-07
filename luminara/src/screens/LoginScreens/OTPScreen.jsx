import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import colors from '../../constants/colors';
import fontStyles from '../../constants/fontStyles';
import globalStyles from '../../constants/globalStyles';

const OTPScreen = () => {
  return (
    <View style={[globalStyles.screenContainer, styles.container]}>
      <Text style={styles.title}>OTP Screen</Text>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    ...fontStyles.bold,
    ...fontStyles.h1,
    color: colors.textPrimary,
  },
  subtitle: {
    ...fontStyles.regular,
    ...fontStyles.body,
    color: colors.textSecondary,
    marginTop: 8,
  },
});

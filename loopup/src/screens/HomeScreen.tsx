import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({ navigation, route }: Props) => {
  const userEmail = route.params?.userEmail ?? 'User';
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.title}>Welcome, {userEmail}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login')}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600' },
  button: { marginTop: 24, backgroundColor: '#1976D2', padding: 14, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '600' },
});

export default HomeScreen;

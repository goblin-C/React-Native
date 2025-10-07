import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { loginUser } from '../services/authService';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation, route }: Props) => {
  const [email, setEmail] = useState(route.params?.prefillEmail ?? '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill in all fields');
    setLoading(true);
    const result = await loginUser(email, password);
    setLoading(false);

    if (result.success) navigation.replace('Home', { userEmail: email });
    else Alert.alert('Login Failed', result.message);
  };

  return (
    <SafeAreaView style={styles.container}>
     <Image source={require('../assets/images/splash.jpg')} style={styles.logo} />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.btnText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

    <View style={styles.row}>
    <Text style={{ color: '#000' }}>Don’t have an account?</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}> Sign Up</Text>
    </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 12, padding: 12 },
  button: { marginTop: 20, backgroundColor: '#1976D2', padding: 14, borderRadius: 8, width: '100%' },
  btnText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  row: { flexDirection: 'row', marginTop: 16 },
  link: { color: '#1976D2', fontWeight: '600' },
});

export default LoginScreen;

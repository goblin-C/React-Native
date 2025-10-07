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
import { registerUser } from '../services/authService';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  const [form, setForm] = useState({
    first: '',
    last: '',
    phone: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const { first, last, phone, email, password } = form;

    if (!first || !last || !phone || !email || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    setLoading(true);
    const result = await registerUser(form);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Account created successfully! Please login.');
      navigation.navigate('Login', { prefillEmail: email });
    } else {
      Alert.alert('Error', result.message);
    }
  };

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/splash.jpg')} style={styles.logo} />

      {['first', 'last', 'phone', 'email', 'password'].map((field) => {
        const placeholderMap: Record<string, string> = {
          first: 'First Name',
          last: 'Last Name',
          phone: 'Phone Number',
          email: 'Email Address',
          password: 'Password',
        };

        return (
          <TextInput
            key={field}
            placeholder={placeholderMap[field]}
            placeholderTextColor="#777"
            value={form[field as keyof typeof form]}
            onChangeText={(v) => handleChange(field as keyof typeof form, v)}
            secureTextEntry={field === 'password'}
            style={styles.input}
            keyboardType={
              field === 'email'
                ? 'email-address'
                : field === 'phone'
                ? 'phone-pad'
                : 'default'
            }
            autoCapitalize={field === 'email' ? 'none' : 'words'}
          />
        );
      })}

      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.btnText}>{loading ? 'Creating...' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={{ color: '#000' }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}> Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 12,
    padding: 12,
    color: '#000', // ensure text visible
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1976D2',
    padding: 14,
    borderRadius: 8,
    width: '100%',
  },
  btnText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
  row: { flexDirection: 'row', marginTop: 16 },
  link: { color: '#1976D2', fontWeight: '600' },
});

export default SignupScreen;

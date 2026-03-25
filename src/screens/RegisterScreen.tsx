import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await register(email, pass);
      Alert.alert('Success', 'Registered successfully. Please login.');
      navigation.navigate('Login');
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, borderRadius: 10, marginBottom: 15, backgroundColor: '#fff' },
  btn: { backgroundColor: '#6C63FF', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#6C63FF', textAlign: 'center', marginTop: 10 }
});

export default RegisterScreen;

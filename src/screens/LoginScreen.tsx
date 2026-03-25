import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, pass);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
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
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 20,
    backgroundColor: '#F5F5F5'
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 30, 
    textAlign: 'center'
  },
  input: {
    borderWidth: 1, 
    borderColor: '#ddd', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15,
    backgroundColor: '#fff'
  },
  btn: {
    backgroundColor: '#6C63FF', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 15
  },
  btnText: {
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16
  },
  link: {
    color: '#6C63FF', 
    textAlign: 'center', 
    marginTop: 10
  }
});

export default LoginScreen;

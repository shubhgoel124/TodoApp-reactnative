import React, { useState, useContext } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TaskContext } from '../context/TaskContext';

const AddTaskScreen = ({ navigation }: any) => {
  const [title, set_title] = useState('');
  const [desc, set_desc] = useState('');
  const [deadline, set_deadline] = useState('');
  const [priority, set_priority] = useState('1');
  const { addTask } = useContext(TaskContext);

  const handleAdd = () => {
    if (!title) return;
    const taskData = {
      title,
      description: desc,
      datetime: new Date().toISOString(),
      deadline: deadline ? new Date(deadline).toISOString() : new Date(Date.now() + 86400000).toISOString(),
      priority: parseInt(priority, 10) || 1,
      status: 'pending'
    };
    addTask(taskData);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={set_title} placeholder="Task Title" />

      <Text style={styles.label}>Description</Text>
      <TextInput style={[styles.input, { height: 80 }]} value={desc} onChangeText={set_desc} placeholder="Description" multiline />

      <Text style={styles.label}>Deadline (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} value={deadline} onChangeText={set_deadline} placeholder="e.g. 2026-12-31" />

      <Text style={styles.label}>Priority (1-Low, 2-Medium, 3-High)</Text>
      <TextInput style={styles.input} value={priority} onChangeText={set_priority} keyboardType="numeric" />

      <TouchableOpacity style={styles.btn} onPress={handleAdd}>
        <Text style={styles.btnText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F0F0F5' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderColor: '#ddd', borderWidth: 1 },
  btn: { backgroundColor: '#6C63FF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});

export default AddTaskScreen;

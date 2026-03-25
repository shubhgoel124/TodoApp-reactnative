import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';

const TaskListScreen = ({ navigation }: any) => {
  const { logout } = useContext(AuthContext);
  const { tasks, loadTasks, updateTask, deleteTask } = useContext(TaskContext);
  const [sorted_tasks, set_sorted_tasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    // Custom sort: mix time, deadline, priority
    const sorted = [...tasks].sort((a: any, b: any) => {
      // higher priority first (3 is High, 1 is Low)
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      // then closer deadline
      const deadA = new Date(a.deadline).getTime();
      const deadB = new Date(b.deadline).getTime();
      if (deadA !== deadB) {
        return deadA - deadB;
      }
      // then creation time
      const timeA = new Date(a.datetime).getTime();
      const timeB = new Date(b.datetime).getTime();
      return timeB - timeA;
    });
    set_sorted_tasks(sorted as any);
  }, [tasks]);

  const toggleStatus = (item: any) => {
    const newStatus = item.status === 'completed' ? 'pending' : 'completed';
    updateTask(item._id, { status: newStatus });
  };

  const deleteItem = (id: string) => {
    Alert.alert('Delete', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', onPress: () => deleteTask(id) }
    ]);
  };

  const getPriorityColor = (p: number) => {
    if (p === 3) return '#ff4d4d';
    if (p === 2) return '#ffb84d';
    return '#4dff4d';
  };

  const renderTask = ({ item }: any) => {
    const isDone = item.status === 'completed';
    return (
      <View style={[styles.taskCard, isDone && styles.taskDone]}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, isDone && styles.textDone]}>{item.title}</Text>
          <Text style={styles.taskDesc}>{item.description}</Text>
          <Text style={styles.taskDate}>Due: {new Date(item.deadline).toLocaleString()}</Text>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
            <Text style={styles.priorityText}>Pri: {item.priority}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => toggleStatus(item)}>
            <Text style={styles.actionText}>{isDone ? 'Undo' : 'Done'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.deleteBtn]} onPress={() => deleteItem(item._id)}>
            <Text style={styles.actionText}>Del</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sorted_tasks}
        keyExtractor={(item: any) => item._id}
        renderItem={renderTask}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F5', padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  logoutBtn: { color: '#ff4d4d', fontWeight: 'bold' },
  taskCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, flexDirection: 'row', elevation: 3 },
  taskDone: { opacity: 0.6 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  textDone: { textDecorationLine: 'line-through', color: '#999' },
  taskDesc: { color: '#666', marginBottom: 5 },
  taskDate: { color: '#888', fontSize: 12, marginBottom: 5 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, alignSelf: 'flex-start' },
  priorityText: { fontSize: 10, fontWeight: 'bold', color: '#fff' },
  actions: { justifyContent: 'space-around', alignItems: 'center', paddingLeft: 10 },
  actionBtn: { backgroundColor: '#6C63FF', padding: 8, borderRadius: 5, minWidth: 50, alignItems: 'center', marginBottom: 5 },
  deleteBtn: { backgroundColor: '#ff4d4d' },
  actionText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, borderRadius: 30, backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabIcon: { color: '#fff', fontSize: 30, fontWeight: 'bold' }
});

export default TaskListScreen;

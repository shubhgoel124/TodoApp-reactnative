import React, { createContext, useState } from 'react';
import api from '../api';

export const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const addTask = async (taskData: any) => {
    try {
      await api.post('/tasks', taskData);
      loadTasks();
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = async (id: string, updates: any) => {
    try {
      await api.put(`/tasks/${id}`, updates);
      loadTasks();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loadTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

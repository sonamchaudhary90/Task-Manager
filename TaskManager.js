import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, toggleTask, editTask } from './store/actions/taskActions';
import { View, FlatList, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';

const editIcon = require('./assets/edit-icon.png');
const toggleCheckedIcon = require('./assets/toggle-icon-checked.png');
const toggleUncheckedIcon = require('./assets/toggle-icon-unchecked.png');

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks);

  const fadeAnim = new Animated.Value(1); 

  const handleAddOrEditTask = () => {
    if (task.trim()) {
      if (editTaskId) {
        dispatch(editTask(editTaskId, task));
        setEditTaskId(null);
      } else {
        dispatch(addTask(task));
      }
      setTask('');
    }
  };

  const handleEditTask = (item) => {
    setTask(item.task);
    setEditTaskId(item.id);
  };

  const handleDeleteTask = (taskId) => {
    // Optional: Add animation effect before deletion
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(deleteTask(taskId));
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Add a new task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleAddOrEditTask}
        style={styles.addButton}
      >
        {editTaskId ? 'Update Task' : 'Add Task'}
      </Button>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.taskCard}>
            <View style={styles.taskItem}>
              <TouchableOpacity onPress={() => dispatch(toggleTask(item.id))}>
                <Image
                  source={item.completed ? toggleCheckedIcon : toggleUncheckedIcon}
                  style={[styles.toggleIcon, styles.darkIcon]}
                />
              </TouchableOpacity>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.task}
              </Text>
              <TouchableOpacity onPress={() => handleEditTask(item)}>
                <Image
                  source={editIcon}
                  style={[styles.editIcon, styles.darkIcon]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                <Image
                  source={require('./assets/delete-icon.png')}
                  style={[styles.deleteIcon, styles.darkIcon]}
                />
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    marginBottom: 20,
  },
  taskCard: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  toggleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  editIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  deleteIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  darkIcon: {
    tintColor: 'black',
  },
});

export default TaskManager;

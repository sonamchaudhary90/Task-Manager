import { ADD_TASK, DELETE_TASK, TOGGLE_TASK, EDIT_TASK } from './taskTypes';

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: {
    id: Date.now(), // Unique identifier
    task,
    completed: false,
  },
});

export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const toggleTask = (id) => ({
  type: TOGGLE_TASK,
  payload: id,
});

export const editTask = (id, newTask) => ({
  type: EDIT_TASK, // Use the new action type
  payload: { id, newTask },
});

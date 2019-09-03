import testData from '../testData';
import { ADD_TASK, EDIT_TASK, DELETE_TASK } from './taskActions';
import { Task } from '../models/Task';
import uuid from 'uuid';

const initialState = {
  tasks: testData
};
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      const task = new Task(
        uuid(),
        action.payload.title,
        action.payload.description,
        parseInt(action.payload.difficulty),
        action.payload.dueDate,
        action.payload.completed
      );
      return {
        tasks: state.tasks.concat(task)
      };
    case EDIT_TASK:
      const taskIndex = state.tasks.findIndex(
        task => task.id === action.payload.id
      );
      const {
        title,
        description,
        difficulty,
        dueDate,
        completed
      } = action.payload.taskData;
      const editedTask = new Task(
        action.payload.id,
        title,
        description,
        difficulty,
        dueDate,
        completed
      );
      const newTaskArray = [...state.tasks];
      newTaskArray[taskIndex] = editedTask;
      return {
        tasks: newTaskArray
      };
    case DELETE_TASK:
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
  }
  return state;
};
export default taskReducer;

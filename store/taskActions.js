export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';

export const addTask = taskData => ({ type: ADD_TASK, payload: taskData });
export const editTask = (id, taskData) => ({
  type: EDIT_TASK,
  payload: { id, taskData }
});
export const deleteTask = taskId => {
  return {
    type: DELETE_TASK,
    payload: taskId
  };
};

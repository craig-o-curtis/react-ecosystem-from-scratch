// Action Types
export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';

// Action Creators
export const createTodo = (text) => ({
  type: CREATE_TODO,
  payload: { text }
});

export const removeTodo = (text) => ({
  type: REMOVE_TODO,
  payload: { text }
});

export const completeTodo = (text) => ({
  type: COMPLETE_TODO,
  payload: { text }
});

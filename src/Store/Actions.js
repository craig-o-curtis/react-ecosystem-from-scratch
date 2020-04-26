// Action Types
export const CREATE_TODO = 'CREATE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
// Thunk Action Types
export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';

// Action Creators
export const createTodo = (todo) => ({
  type: CREATE_TODO,
  payload: { todo }
});

export const removeTodo = (text) => ({
  type: REMOVE_TODO,
  payload: { text }
});

export const completeTodo = (text) => ({
  type: COMPLETE_TODO,
  payload: { text }
});

// Thunk Action Creators
export const loadTodosInProgress = () => ({
  type: LOAD_TODOS_IN_PROGRESS
});
export const loadTodosSuccess = (todos) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos }
});
export const loadTodosFailure = (error) => ({
  type: LOAD_TODOS_FAILURE,
  payload: { error }
});

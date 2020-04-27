// Action Types
export const API_CREATED_TODO = 'API_CREATED_TODO';
export const API_UPDATED_COMPLETED_TODO = 'API_UPDATED_COMPLETED_TODO';
export const API_REMOVED_TODO = 'API_REMOVED_TODO';
// export const COMPLETE_TODO = 'COMPLETE_TODO';
// Thunk Action Types
export const API_LOADING_TODOS = 'API_LOADING_TODOS';
export const API_LOADED_TODOS_SUCCESS = 'API_LOADED_TODOS_SUCCESS';
export const API_LOADED_TODOS_FAILURE = 'API_LOADED_TODOS_FAILURE';

// Action Creators
export const apiCreatedTodo = (todo) => ({
  type: API_CREATED_TODO,
  payload: { todo }
});

// ** called on successful update API call, pass updated server todo back to stgore
export const apiUpdatedCompletedTodo = (todo) => ({
  type: API_UPDATED_COMPLETED_TODO,
  payload: { todo }
});

// ** this is called on successful delete API call, passing deleted todo from response
export const apiRemovedTodo = (todo) => ({
  type: API_REMOVED_TODO,
  payload: { todo }
});

// export const completeTodo = (text) => ({
//   type: COMPLETE_TODO,
//   payload: { text }
// });

// Thunk Action Creators
export const apiLoadingTodos = () => ({
  type: API_LOADING_TODOS
});
export const apiLoadedTodosSuccess = (todos) => ({
  type: API_LOADED_TODOS_SUCCESS,
  payload: { todos }
});
export const apiLoadedTodosFailure = (error) => ({
  type: API_LOADED_TODOS_FAILURE,
  payload: { error }
});

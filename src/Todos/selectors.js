// Reselect's createSelector uses memoization
import { createSelector } from 'reselect';

export const getTodosSelector = (state) => state.todos.data;
export const getTodosLoadingSelector = (state) => state.todos.isLoading;

// Higher order selectors - no need to refer to state.
// last arg is return value of entire selector
// can pass as many args as want
// call with getIncompleteTodosSelector(state)
export const getIncompleteTodosSelector = createSelector(
  getTodosSelector,
  (todos) => todos.filter(todo => !todo.isCompleted)
);

// Conceptual example combining selectors / pieces of state
export const exampleGetIncompleteTodosNotLoadingSelector = createSelector(
  getTodosSelector,
  getTodosLoadingSelector,
  (todos, isLoading) => isLoading ? [] : todos.filter(todo => !todo.isCompleted)
);

export const getCompleteTodosSelector = createSelector(
  getTodosSelector,
  (todos) => todos.filter(todo => todo.isCompleted)
);

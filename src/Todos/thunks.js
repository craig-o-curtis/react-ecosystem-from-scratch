import { 
  createTodo, 
  loadTodosInProgress, 
  loadTodosSuccess, 
  loadTodosFailure 
} from '../Store/Actions';

// a thunk is a function that retunrns another function that contains the logic
export const exampleDisplayAlert = (text) => () => {
  console.error(`hello thunk you clicked on ${text}`);
}

// Thunks passed dispatch and getState
export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    // do request to server
    const response = await fetch('http://localhost:8080/todos');
    const todos = await response.json();
  
    dispatch(loadTodosSuccess(todos));
  } catch(error) {
    dispatch(loadTodosFailure(error));
    dispatch(exampleDisplayAlert(error));
  }
}

export const addTodoRequest = (text) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify({text});
    const response = await fetch('http://localhost:8080/todos', {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body,
    });
  
    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch(error) {
    dispatch(exampleDisplayAlert(error));
  }
};
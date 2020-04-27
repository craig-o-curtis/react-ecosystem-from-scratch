import { 
  apiCreatedTodo, 
  apiRemovedTodo,
  apiLoadingTodos, 
  apiLoadedTodosSuccess, 
  apiLoadedTodosFailure 
} from '../Store/Actions';

// a thunk is a function that retunrns another function that contains the logic
export const exampleDisplayAlert = (text) => () => {
  console.error(`hello thunk you clicked on ${text}`);
}

// Thunks passed dispatch and getState
export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(apiLoadingTodos());
    // do request to server
    const response = await fetch('http://localhost:8080/todos');
    const todos = await response.json();
  
    dispatch(apiLoadedTodosSuccess(todos));
  } catch(error) {
    dispatch(apiLoadedTodosFailure(error));
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
    dispatch(apiCreatedTodo(todo));
  } catch(error) {
    dispatch(exampleDisplayAlert(error));
  }
};

export const removeTodoRequest = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'delete'
    });
    const removedTodo = await response.json();

    dispatch(apiRemovedTodo(removedTodo))
  } catch (error) {
    dispatch(exampleDisplayAlert(error));
  }
};

// ** Fired whenever any action in entire app is called
import { 
  API_CREATED_TODO, 
  API_UPDATED_COMPLETED_TODO,
  API_REMOVED_TODO, 
  API_LOADING_TODOS,
  API_LOADED_TODOS_SUCCESS,
  API_LOADED_TODOS_FAILURE
} from './Actions';

// This is to combine all the reducers....
const initialState = {
  isLoading: false,
  data: [],
}

// ** Name after what part of state managing inside main reducer
export const todos = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case API_LOADING_TODOS:
      return {
        ...state,
        isLoading: true
      };

    case API_LOADED_TODOS_SUCCESS:
      const { todos } = payload;
      return {
        ...state,
        isLoading: false,
        data: todos,
      };
    
    case API_LOADED_TODOS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    
    case API_CREATED_TODO:
      const { todo } = payload;

      return {
        ...state,
        data: state.data.concat(todo)
      }
    
    case API_REMOVED_TODO:
      const { todo: todoToRemove } = payload;
      return {
        ...state,
        data: state.data.filter(todo => todo.id !== todoToRemove.id)
      };
    
    case API_UPDATED_COMPLETED_TODO:
      return {
        ...state,
        data: state.data.map(todo => {
          return (todo.id === payload.todo.id)
            ? {...todo, isCompleted: true}
            : todo;
        })
      }

    default:
      return state;
  }
}

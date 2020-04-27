// ** Fired whenever any action in entire app is called
import { 
  API_CREATED_TODO, 
  API_UPDATED_COMPLETED_TODO,
  API_REMOVED_TODO, 
  API_LOADING_TODOS,
  API_LOADED_TODOS_SUCCESS,
  API_LOADED_TODOS_FAILURE
} from './Actions';

// ** Name after what part of state managing inside main reducer
export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch(type) {
    case API_LOADING_TODOS:
      return state;

    case API_LOADED_TODOS_SUCCESS:
      const { todos } = payload;
      return [...todos];
    
    case API_LOADED_TODOS_FAILURE:
      return state;
    
    case API_CREATED_TODO:
      const { todo } = payload;

      return [
        ...state,
        todo
      ]
    
    case API_REMOVED_TODO:
      const { todo: todoToRemove } = payload;
      return [
        ...state.filter(todo => todo.id !== todoToRemove.id)
      ];
    
    case API_UPDATED_COMPLETED_TODO:
      return state.map(todo => {
        return (todo.id === payload.todo.id)
          ? {...todo, isCompleted: true}
          : todo;
      });

    default:
      return state;
  }
}

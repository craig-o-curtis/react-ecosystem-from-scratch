import { 
  API_LOADING_TODOS, 
  API_LOADED_TODOS_SUCCESS, 
  API_LOADED_TODOS_FAILURE 
} from './Actions';

// job of this reducer is to return true or false based on actions in the app
export const isLoading = (state = false, action) => {
  const { type } = action;

  switch(type) {
    case API_LOADING_TODOS:
      return true;
    case API_LOADED_TODOS_SUCCESS:
    case API_LOADED_TODOS_FAILURE:
      return false;              
    default: 
      return state;
  }
}

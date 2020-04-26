import { LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE } from './Actions';

// job of this reducer is to return true or false based on actions in the app
export const isLoading = (state = false, action) => {
  const { type } = action;

  switch(type) {
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;              
    default: 
      return state;
  }
}

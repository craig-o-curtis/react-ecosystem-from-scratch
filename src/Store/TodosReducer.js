// ** Fired whenever any action in entire app is called
import { 
  CREATE_TODO, 
  REMOVE_TODO, 
  COMPLETE_TODO,
  LOAD_TODOS_IN_PROGRESS,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE
} from './Actions';

// ** Name after what part of state managing inside main reducer
export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch(type) {
    case LOAD_TODOS_IN_PROGRESS:
      return state;
    case LOAD_TODOS_SUCCESS:
      // Get todos from payload
      const { todos } = payload;
      return [...todos];
    case LOAD_TODOS_FAILURE:
      return state;
    case CREATE_TODO:
      const { todo } = payload;

      return [
        ...state,
        todo
      ]
      // // Local non-=API implementation
      // const { text } = payload;
      // const newTodo = {
      //   text,
      //   isCompleted: false,
      // }
      // return [
      //   ...state,
      //   newTodo,
      // ];
    case REMOVE_TODO:
      return [
        ...state.filter(todo => todo.text !== payload.text)
      ];
    case COMPLETE_TODO:
      return state.map(todo => {
        return (todo.text === payload.text)
          ? {...todo, isCompleted: true}
          : todo;
      });

    default:
      return state;
  }
}

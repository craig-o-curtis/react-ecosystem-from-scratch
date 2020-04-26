// ** Fired whenever any action in entire app is called
import { CREATE_TODO, REMOVE_TODO, COMPLETE_TODO } from './Actions';
// ** Name after what part of state managing inside main reducer
export const todos = (state = [], action) => {
  const { type, payload } = action;

  switch(type) {
    
    case CREATE_TODO:
      let { text } = payload;
      const newTodo = {
        text,
        isCompleted: false,
      }
      return [
        ...state,
        newTodo,
      ];
    case REMOVE_TODO:
      return [
        ...state.filter(todo => todo.text !== payload.text)
      ];
    case COMPLETE_TODO:
      const newTodos = [...state];
      newTodos.find(todo => todo.text === payload.text).isCompleted = true;
      return [
        ...newTodos
      ];
    default: 
      return state;
  }
}

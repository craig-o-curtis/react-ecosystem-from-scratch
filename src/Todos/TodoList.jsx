import React from 'react';
import { connect } from 'react-redux';
import { removeTodo, completeTodo } from '../Store/Actions';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import './TodoList.css';

const TodoList = ({ todos = [], onRemovePressed, onCompletePressed }) => {
  
  return (
    <div className="TodoList">
      <NewTodoForm />
      {todos.map((todo, idx) => (
        <TodoListItem key={`todo-key-${idx}`} todo={todo} onRemovePressed={onRemovePressed} onCompletePressed={onCompletePressed} />
      ))}
    </div>
  );
}

const mapStateToProps = ({ todos }) => ({ todos });

const mapDispatchToProps = (dispatch) => ({
  onCompletePressed: (text) => {
    return dispatch(completeTodo(text))
  },
  onRemovePressed: (text) => {
    return dispatch(removeTodo(text))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
// Redux Action Creators
import { completeTodo } from '../Store/Actions';
// Thunks for API calls
import { loadTodos, removeTodoRequest } from './thunks';
import './TodoList.css';

const TodoList = ({ todos = [], isLoading, onRemovePressed, onCompletePressed, startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = (<div>Loading todos...</div>);

  const content = (
    <div className="TodoList">
      <NewTodoForm />
      {todos.map((todo, idx) => (
        <TodoListItem key={`todo-key-${idx}`} todo={todo} onRemovePressed={onRemovePressed} onCompletePressed={onCompletePressed} />
      ))}
    </div>
  );
  
  return isLoading ? loadingMessage : content;
}

const mapStateToProps = ({ todos, isLoading }) => ({ todos, isLoading });

const mapDispatchToProps = (dispatch) => ({
  // Action Creators
  onCompletePressed: (text) => dispatch(completeTodo(text)),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  // Thunks
  startLoadingTodos: () => dispatch(loadTodos())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

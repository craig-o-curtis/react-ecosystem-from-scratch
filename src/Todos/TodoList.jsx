import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
// Thunks for API calls
import { loadTodosRequest, removeTodoRequest, completeTodoRequest } from './thunks';
import './TodoList.css';
// Selectors
import { getTodosSelector, getTodosLoadingSelector, getIncompleteTodosSelector, getCompleteTodosSelector } from './selectors';

const TodoList = ({ 
  // todos = [],
  incompleteTodos = [], 
  completeTodos = [], 
  isLoading, 
  onRemovePressed, 
  onCompletePressed, 
  startLoadingTodos 
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = (<div>Loading todos...</div>);

  const content = (
    <div className="TodoList">
      <NewTodoForm />
      {incompleteTodos.length > 0 && (<h2>Incomplete Todos:</h2>)}
      {incompleteTodos.map((todo, idx) => (
        <TodoListItem 
          key={`todo-key-${idx}`} 
          todo={todo} 
          onRemovePressed={onRemovePressed} 
          onCompletePressed={onCompletePressed} 
        />
      ))}

      {completeTodos.length > 0 && (<h2>Complete Todos:</h2>)}
      {completeTodos.map((todo, idx) => (
        <TodoListItem 
          key={`todo-key-${idx}`} 
          todo={todo} 
          onRemovePressed={onRemovePressed} 
          onCompletePressed={onCompletePressed} 
        />
      ))}
    </div>
  );
  
  return isLoading ? loadingMessage : content;
}

// const mapStateToProps = ({ todos, isLoading }) => ({ todos, isLoading });

const mapStateToProps = (state) => {
  return {
    // ** prior to selectors
    // todos: getTodosSelector(state),
    // ** with reselect-selectors
    incompleteTodos: getIncompleteTodosSelector(state),
    completeTodos: getCompleteTodosSelector(state),
    isLoading: getTodosLoadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  // Action Creators
  onCompletePressed: (id) => dispatch(completeTodoRequest(id)),
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  // Thunks
  startLoadingTodos: () => dispatch(loadTodosRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

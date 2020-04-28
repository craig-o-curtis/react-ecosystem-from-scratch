import React, { useEffect } from 'react';
// styled components
import styled from 'styled-components';
// redux
import { connect } from 'react-redux';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
// Thunks for API calls
import { loadTodosRequest, removeTodoRequest, completeTodoRequest } from './thunks';

// Selectors
import { getTodosLoadingSelector, getIncompleteTodosSelector, getCompleteTodosSelector } from './selectors';

// Styled component
// ` is a tag function
const BigRedText = styled.div`
  font-size: 46px;
  color: #F00;
  text-align: center;
  background-color: transparent;
`;

const ScTodoListWrapper = styled.div`
  margin: 1rem auto;
  max-width: 700px;
  background: #fefef0;
`;

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
    <ScTodoListWrapper>
      <BigRedText>My Todos</BigRedText>
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
    </ScTodoListWrapper>
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

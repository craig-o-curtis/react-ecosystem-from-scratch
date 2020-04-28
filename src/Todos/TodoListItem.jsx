import React from 'react';
import styled, { css } from 'styled-components';

// 1 day in milliseconds is: 8640000
const ScTodoListItemWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  margin-top: 8px;
  padding: 16px;
  position: relative;
  box-shadow: 0 4px 8px grey;

  ${props => 
    props.isCompleted &&
    css`
      background: black;
      color: lime;
    `
  }
`;

export const getBorderStyleForDate = (startingDate, currentDate) => {
  return startingDate > new Date(currentDate - 8640000 * 5) 
    ? 'none' 
    : '5px solid red';
};

const ScTodoListItemWrapperWithWarning = styled(ScTodoListItemWrapper)`
  border-bottom: ${props => getBorderStyleForDate(new Date(props.createdAt), Date.now()) };
`;

const ScButtonsContainer = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

const ScButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  display: inline-block;
  &:hover {
    opacity: 0.85;
  }
`;

const ScCompletedButton = styled(ScButton)`
  background-color: #22ee22;
`;

const ScRemoveButton = styled(ScButton)`
  background-color: #ee2222;
  margin-left: 8px;
`;

const TodoListItem = ({todo, onRemovePressed, onCompletePressed}) => {

  const ScWrapper = todo.isCompleted ? ScTodoListItemWrapper : ScTodoListItemWrapperWithWarning;

  return (
    <ScWrapper 
      isCompleted={todo.isCompleted}
      createdAt={todo.createdAt}
    >
      <h3>{todo.text}</h3>
      <p>Created at: { ( new Date( todo.createdAt ).toLocaleDateString() ) }</p>
      <ScButtonsContainer>
        {!todo.isCompleted && (
          <ScCompletedButton 
            onClick={() => onCompletePressed(todo.id)}
          >
            Mark as Completed
          </ScCompletedButton>
        )}
        <ScRemoveButton 
          onClick={() => onRemovePressed(todo.id)}
        >
          Remove
        </ScRemoveButton>
      </ScButtonsContainer>
    </ScWrapper>
  );
}

export default TodoListItem;

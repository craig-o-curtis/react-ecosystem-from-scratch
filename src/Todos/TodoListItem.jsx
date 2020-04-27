import React from 'react';
import './TodoListItem.css';

const TodoListItem = ({todo, onRemovePressed, onCompletePressed}) => {
  return (
    <div className={`TodoListItem ${todo.isCompleted ? 'completed' : ''}`}>
      <h3>{todo.text}</h3>
      <div className="buttons-container">
        {!todo.isCompleted && (
          <button 
            className="completed-button" 
            onClick={() => onCompletePressed(todo.id)}
          >
            Mark as Completed
          </button>
        )}
        <button 
          className="remove-button" 
          onClick={() => onRemovePressed(todo.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default TodoListItem;

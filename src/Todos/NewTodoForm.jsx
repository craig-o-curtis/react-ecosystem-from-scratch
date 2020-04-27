import React, { useState } from 'react';
import { connect } from 'react-redux';
// thunks
import { addTodoRequest } from '../Todos/thunks';
// selectors -- seem absolutely unnecessary at this point...
import { getTodosSelector } from './selectors';
import './NewTodoForm.css';

// ** arg1 todos from mapStateToProps pulled out of TodosReducer.js > Store.js
// ** arg2 is abstracted dispatch
const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    
    const isDuplicateText = todos.length && todos.some((todo) => todo.text === inputValue);

    if (!isDuplicateText) {
      onCreatePressed( inputValue );
      setInputValue('');
    }
  }

  return (
    <form className="NewTodoForm" onSubmit={onSubmit}>
      <input className="new-todo-input" 
        type="text" 
        placeholder="Type your new todo here"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button className="new-todo-button" 
        type={'submit'}
        onClick={onSubmit}
      >Create Todo</button>
    </form>
  );
}

// ** arg1 state is entire Redux state
// ** purpose is to grab piece of state this component needs
// ** this is EXACTLY what useContext does out of the box without all of this complexity
// ** since pulled in here, now can destructure this from this component props
// const mapStateToProps = (state) => ({
//   todos: state.todos
// });
const mapStateToProps = (state) => ({
  todos: getTodosSelector(state)
});

// ** arg1 dispatch will also be passed to the component
// ** dispatch is a function that triggers actions the store will respond to
// ** create methods here as props that internally call actions
const mapDispatchToProps = (dispatch) => ({
  // ** we just pass the text, the API handles id, isCompleted
  onCreatePressed: (text) => dispatch(addTodoRequest(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);

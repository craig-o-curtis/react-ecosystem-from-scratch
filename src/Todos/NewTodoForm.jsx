import React, { useState } from 'react';
// Styled components
import styled from 'styled-components';
// Redux
import { connect } from 'react-redux';
// thunks
import { addTodoRequest } from '../Todos/thunks';
// selectors -- seem absolutely unnecessary at this point...
import { getTodosSelector } from './selectors';

const ScNewTodoForm = styled.form`
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 8px grey;
`;

const ScTodoInput = styled.input`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-bottom: 2px solid #ddd;
  border-radius: 8px;
  width: 70%;
  outline: none;
`;

const ScNewTodoButton = styled.button`
  font-size: 16px;
  padding: 8px;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  margin-left: 8px;
  width: 20%;
  background-color: #22ee22;
  opacity: 0.7;
  transition: 0.2s opacity linear;

  &:hover {
    opacity: 1;
  }
`;



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
    <ScNewTodoForm onSubmit={onSubmit}>
      <ScTodoInput
        type="text" 
        placeholder="Type your new todo here"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <ScNewTodoButton
        type={'submit'}
        onClick={onSubmit}
      >Create Todo</ScNewTodoButton>
    </ScNewTodoForm>
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

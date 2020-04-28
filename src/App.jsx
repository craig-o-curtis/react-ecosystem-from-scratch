import React from "react";
import { hot } from 'react-hot-loader';
// Styled component.... this seems iffy
import styled from 'styled-components';
// custom components
import TodoList from './Todos/TodoList';
import "./App.css";

const ScApp = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  color: #222;
  width: 100vw;
  height: 100vh;
  padding-top: 1rem;
`;

const App = () => {
  return (
    <ScApp>
      <TodoList />
    </ScApp>
  );
};

export default hot(module)(App);

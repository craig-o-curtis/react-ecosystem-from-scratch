# React Ecosystem from Scratch
-- A non-CRA demo app from scratch diving into Babel, Webpack, Redux, Thunk, Reselect, and Styled Components --

To run this app locally:
- clone the repo
- run `npm install`
- run `npm run dev`

Sibling Backend app is at [https://github.com/craig-o-curtis/react-ecosystem-from-scratch-server](https://github.com/craig-o-curtis/react-ecosystem-from-scratch-server)

This is documentation of how this project was set up. This steps can also be followed to set up a similar project from scratch.
This project is a from-scratch React Ecosystem. It includes the following technologies:

1. [Adding Babel, Webpack, and React](#adding-babel-webpack-and-react)
2. [Adding Redux](#adding-redux)
3. [Adding Thunk](#adding-thunk)
4. [Adding Reselect](#adding-reselect)
5. [Adding Styled Components](#adding-styled-components)

## Adding Babel, Webpack, and React

### Basic Setup - NPM, Git

1. Create a package.json with `npm init -y`
2. Initialize Git with `git init`
3. Create standard public and src dirs, starter html file with `mkdir src`, `mkdir public`, `touch public/index.html`

```bash
npm init -y
git init
touch .gitignore
mkdir src
mkdir public
touch public/index.html
```

Add the following to the `.gitignore` file:

```.gitignore
node_modules/
```

### Setting up ES6 support

#### Install the following packages:

- @babel/core
- @babel/cli
- @babel/preset-env // transforms ES6 to CommonJS
- @babel/preset-react // deals with JSX

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
```

#### Create `.babelrc` file

```bash
touch .babelrc
```

#### Populate with the following json code:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

### Install and setup React

```bash
npm install react react-dom
```

- index.js // code that inserts React app into index.html page
- App.js // code for root app
- App.css // styling for root app

```bash
touch src/index.js
touch src/App.js
touch src/App.css
```

```js
// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

```js
// App.js
import React from "react";
import "./App.css";

const App = () => {
  return <div className="App">...</div>;
};
```

```css
/* App.css */
.App {
}
```

### Setup Webpack to build and serve project

- Converts ES6 and JSX to CommonJS
- Hosts public dir and hosts in a browser

#### Install the Webpack to dev dependencies:

- webpack
- webpack-cli
- webpack-dev-server
- style-loader
- css-loader
- babel-loader

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader
```

- NOTE \* If there is an error on a Mac like `gyp: No Xcode or CLT version detected!`, then use the following steps from [Medium article - No Xcode or CLT version detected macOS Catalina](https://medium.com/flawless-app-stories/gyp-no-xcode-or-clt-version-detected-macos-catalina-anansewaa-38b536389e8d):

- `xcode-select --print-path`, should print something like /Library/Developer/CommandLineTools
- `sudo rm -r -f /Library/Developer/CommandLineTools`, ensuring the path is correct
- `xcode-select --install` // this might take up to an hour to install
- Install the tools and try reinstalling webpack

#### Create `webpack.config.js` file in root dir

```bash
touch webpack.config.js
```

The finished version of webpack in this step will look like the following:

```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  // define entry of js files
  entry: "./src/index.js",
  mode: "development",
  // specify rules how Webpack should transform the code via loaders
  module: {
    rules: [
      /// transform ES code to JS
      {
        test: /\.(js|js)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      /// enable importing of CSS files in React components
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  // define dev server
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/", // held in memory
    hotOnly: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
```

- The dev server can be run directly with `npx webpack-dev-server --mode development`, or with the npm command in defined in package.json `npm run dev`
- View code at http://localhost:3000
- This allows hot reloading of CSS, but not JS

### Hot reloading of JS and JSX

- Install react-hot-loader with `npm install --save-dev react-hot-loader`
- in App.js, add the following:

```jsx
...
import { hot } from 'react-hot-loader';
...
export default hot(module)(App);
```

- restart the dev server with `npm run dev`

### Creating a Webpack Build

- In package.json, define new build commands with webpack built-ins:

```json
  "scripts": {
    ...
    "build": "npm run build:prod",
    "build:dev": "npx webpack --mode development",
    "build:prod": "npx webpack --mode production",
    ...
  }
```

## Adding Redux
The use of Redux now is largely to maintain existing code. New projects should really weigh React Hooks as they can solve the same global state management issue Redux aims to.
### Parts of Redux
1. Redux Store - immutable JSON object of application data `{...}`
- Store data like user information, UI state, API load state

2. Redux Actions - JSON objects consisting of type and payload `{ type, payload }`
- Define events that happen in application
- Ex: `USER_DATA_LOADED`, `MESSAGE_RECEIVED`, `FILTER_APPLIED`

3. Redux Reducers - specify what happens to Redux Store when an action occurs 
```
...
(action) => switch(action.type) {
  case USER_DATA_LOADED: 
    return {
      ...state,
      action.data
    }
}
```
- Forces unidirectional data flow, recreates new objects, arrays


### Adding Redux to a Project
#### Install Redux
```bash
npm install redux react-redux
```

#### Set up Store
- Create a src/Store/Store.js
```
import {createStore, combineReducers} from 'redux';

const reducers = {};

const rootReducer = combineReducers(reducers); // creates consumable reducer forcreateStore

export const configureStore = () => createStore(rootReducer);

```

- In index.js, wrap entire app in Provider from react-redux
```
...
import { Provider } from 'react-redux';
import { configureStore } from './Store/Store';
...
ReactDOM.render(
  <Provider store={configureStore()}>
    <App/>
  </Provider>, 
  document.getElementById('root')
);
...
```

#### Set up Actions
- Create a src/Store/Actions.js file with an ACTION_TYPE and actionCreator:
```
// Action Type
export const CREATE_TODO = 'CREATE_TODO';
// Action Creator
export const createTodo = (text) => ({
  type: CREATE_TODO,
  payload: { text }
});

// Action Type
export const REMOVE_TODO = 'REMOVE_TODO';
// Action Creator
export const removeTodo = (text) => ({
  type: CREATE_TODO,
  payload: { text }
});
```


#### Set up Reducers
- Create src/Store/TodosReducers.js file
```
// ** Fired whenever any action in entire app is called
import { CREATE_TODO, REMOVE_TODO } from './Actions';

export default TodosReducer = (state = [], action) => {
  const { type, payload } = action;

  switch(type) {
    case CREATE_TODO:
      const { text } = payload;
      const newTodo = {
        text,
        isCompleted: false,
      }
      return [...state, newTodo ];
    case REMOVE_TODO:
      const { text } = payload;
      return [ ..state.filter(todo => todo.text !== text) ];
    default: 
      return state;
  }
}
```

- Add reducers to src/Store/Store.js
```
import { createStore, combineReducers } from 'redux';
import TodosReducer from './TodosReducer';

const reducers = {
  TodosReducer,
};

// creates consumable reducer forcreateStore
const rootReducer = combineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
```

#### Connecting Components to the Redux Store
- import `connect` from `react-redux`
- define `mapStateToProps`
- wrap the exported component with `connect( mapStateToProps, mapDispatchToProps )( NewTodoForm )`
- now the tedius part, define two functions, `mapStateToProps` and `mapDispatchToProps`
- for `mapDispatchToProps`, import actions wtih `import { createTodo } from '../Store/Actions';`
- WARNING - there are several layers of cognitive load
- See NewTodoForm, TodoList for detailed example

```
// ** NewTodoForm.js
...
import { connect } from 'react-redux';
import { createTodo } from 'actions';
...
const NewTodoForm = ({ todos, onCreatePressed }) => {
...
const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
}

const mapDispatchToProps = (dispatch) => {outside below the fold
  return {
    onCreatePressed: (text) => dispatch(createTodo(text))
  };
}
...
export default connect( mapStateToProps, mapDispatchToProps)( NewTodoForm );
```

## Adding Redux Perist - save data on refreshes
```bash
npm install redux-persist
```

### Adjust Store.js
```jsx
import { createStore, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {todos} from './TodosReducer';

const reducers = {
  todos,
};

// creates consumable reducer forcreateStore
const rootReducer = combineReducers(reducers);
// redux-persist
const persistConfig = {
  key: 'root',
  storage, // defaults to localStorage on the web
  stateReconciler: autoMergeLevel2 // Tells redux-persist how to reconcile initial + stored states
};
// persistConfig - tells Redux how to save, where to store app data
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(persistedReducer);
```
### Adjust index.js
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'; // redux-persist
import { PersistGate } from 'redux-persist/lib/integration/react' // redux-persist
import { configureStore } from './Store/Store';
import App from './App';

const store = configureStore();
const persister = persistStore(store); // redux-persist

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<>Loading...</>} persistor={persister}> // redux-persist
      <App/>
    </PersistGate>
  </Provider>, 
  document.getElementById('root')
);
```

The app is storing the data at `persist:root` in localStorage.

### Adding Redux Dev Tools
Add the Chrome Redux Devtools.
In Store.js, add the following
```jsx
...
  createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
...
```

### Redux Best Practices
* export connected for testing, and unconnected components for the app
```jsx
export const TodoList = ...
export const connect(...)(TodoList);
```

* Keep Redux actions and async ops out of reducers - store is only for updating state

* Think carefully about what components to connect - connecting makes component less reusable
* Have a higher component connected to store, lower component to filter

## Adding Thunk
* Redux-Thunk for doing async operations, doing API calls
* Side Effect Libraries: Redux Thunk, Redux Saga, Redux Logic
* Redux Saga is most popular, has highest learning curve

### How Thunks work
Regular Redux
1. Components dispatch a Redux action
2. Action goes to Reducer
3. Reducer makes changes to the Store

OR with Thunks
1. Components dispatch a Thunk
2. Thunk performs async operations
3. Thunk dispatches its own Redux actions

Traditional Redux API calls
1. In componentDidMount, or useEffect hook
2. On load of data, dispatch success or error action

Thunks for API calls.
* abstracting loading/error states out of component
1. dispatch function instead of type and payload
```jsx
// redux
dispatch({ type, payload });
// thunk
dispatch( async () => {...});
// further thunk example
async () => {
  ...
  dispatch(loadUserSuccess(user));
  dispatch(loadVideos());
}
```

### Adding Redux-Thunk
* `redux-thunk` for thunks
* `redux-devtools-extension` to add thunks to devtools
* `@babel/runtime` to make async thunks work
* `@babel/plugin-transform-runtime` dev version of @babel/runtime

```bash
npm install redux-thunk redux-devtools-extension @babel/runtime
npm install --save-dev @babel/plugin-transform-runtime
```

In .babelrc
* Add the plugin `@babel/plugin-transform-runtime`
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

In Store.js
* add `applyMiddleware` to redux import
* import thunk, composeWithDevTools
* Adjust createStore to add composeWithDevTools, applyMiddleware, and thunk
```jsx
import { createStore, combineReducers, applyMiddleware } from 'redux';
...
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
...
export const configureStore = () => createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
...
```

--- demo server in sibling project `from-scratch-server`
* install and start the server on port 8080
```bash
npm install && npm run start
```

Mock API is the following:
* GET /todos
* POST /todos
* POST /todos/:id/completed
* DELETE /todos/:id

Create loading todos actions in /Store/Actions.js
```js
...
export const LOAD_TODOS_IN_PROGRESS = 'LOAD_TODOS_IN_PROGRESS';
export const LOAD_TODOS_SUCCESS = 'LOAD_TODOS_SUCCESS';
export const LOAD_TODOS_FAILURE = 'LOAD_TODOS_FAILURE';
...
export const loadTodosInProgress = () => ({
  type: LOAD_TODOS_IN_PROGRESS
});
export const loadTodosSuccess = (todos) => ({
  type: LOAD_TODOS_SUCCESS,
  payload: { todos }
});
export const loadTodosFailure = (error) => ({
  type: LOAD_TODOS_FAILURE,
  payload: { error }
});
```

Create `Todos/thunks.js`, hook up to demo API
* Do API calls with async await in try catch, dispatch actions of response/error
```js
import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from '../Store/Actions';

// Thunks passed dispatch and getState
export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch('http://localhost:8008/todos');
    const todos = await response.json();
  
    dispatch(loadTodosSuccess(todos));
  } catch(error) {
    dispatch(loadTodosFailure(error));
  }
}
```

* Add ANOTHER reducer to keep track of loading

Add a new reducer - LoadingReducer.js
```js
import { LOAD_TODOS_IN_PROGRESS, LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE } from './Actions';
// job of this reducer is to return true or false based on actions in the app
export const isLoading = (state = false, action) => {
  const { type } = action;
  switch(type) {
    case LOAD_TODOS_IN_PROGRESS:
      return true;
    case LOAD_TODOS_SUCCESS:
    case LOAD_TODOS_FAILURE:
      return false;              
    default: 
      return state;
  }
}
```

Add new reducers to Store.js file
```js
...
import { todos } from './TodosReducer';
import { isLoading } from './LoadingReducer';

const reducers = {
  todos,
  isLoading,
};
...
```

Listen for loading in TodoList component
* Pull in isLoading reducer flag
* Use `useEffect` to ... do API call...
```jsx
...
import { loadTodos } from './thunks';
...
const TodoList = ({ todos = [], isLoading, ... startLoadingTodos }) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);
...
const mapDispatchToProps = (dispatch) => ({
  ...
  startLoadingTodos: () => dispatch(loadTodos())
});
...
```

* NOTE - the Actions can listened to in any reducer
In TodosReducer, listen for the LOAD_TODOS actions
```js
    ...
    case LOAD_TODOS_SUCCESS:
      const { todos } = payload; // Get todos from payload
      return todos;
    case LOAD_TODOS_IN_PROGRESS:
    case LOAD_TODOS_FAILURE:
      return state;
    ...
```

* Problem -- persist vs. thunk API call complexity
* Note - app heavily refactored, see source code for complexity


## Adding Reselect
### Redux + Thunks General Review
* Components  ->  Display data
* Reducers    ->  Manage state
* Thunks      ->  Handle side-effect logic

### Selectors
* Selectors are for getting pieces of state... like `useStateValue` in hooks...
* Also for filtering, mapping, transforming data needed from state

In `Todos/selectors.js`: 
```js
export const getTodosSelector = (state) => state.todos;
export const getTodosLoadingSelector = (state) => state.isLoading;
```

And use these to "filter" state in TodosList.jsx
```jsx
...
const mapStateToProps = (state) => {
  return {
    todos: getTodosSelector(state),
    isLoading: getTodosLoadingSelector(state),
  };
};
...
```

But now we can map our own reducers...


## Adding Styled Components



# About this demo app
Apologies, this is yet another 2du app
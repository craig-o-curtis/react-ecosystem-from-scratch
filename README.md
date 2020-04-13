# React Ecosystem from Scratch
-- A non-CRA demo app from scratch diving into Babel, Webpack, Redux, Thunk, Reselect, and Styled Components --

To run this app locally:
- clone the repo
- run `npm install`
- run `npm run dev`

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

## Adding Thunk

## Adding Reselect

## Adding Styled Components



# About this demo app
Apologies, this is yet another 2du app
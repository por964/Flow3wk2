import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const info = [
  { id: "rendering", title: "Rendering with React", info: "Add some text here" },
  { id: "components", title: "components", info: "Add some text here" },
  { id: "props-v-state", title: "Propans v. State", info: "Add some text here" },
  { id: "lorte-opgave", title: "Props how", info: "Add some text here" }
]



ReactDOM.render(<App info={info} />, document.getElementById('root'));

export default info;


import React from 'react';
import ReactDOM from 'react-dom';
const title = 'My Minimal React Webpack Babel Setup';
import Counter from './components/Counter';
import TaskList from './components/TaskList';
import './style.css';
ReactDOM.render(
  <TaskList/>,
  document.getElementById('app')
);
module.hot.accept();
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Line from './line';
// import Circle from './circle';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<Line />, document.getElementById('root'));
// ReactDOM.render(<Circle />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

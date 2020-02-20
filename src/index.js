import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'utils/date.js';
import 'utils/interceptor.js';
import BaseRouter from './router/BaseRouter';
// AppContainer 是必要的 wrapper 组件为热替换
// import { AppContainer } from 'react-hot-loader';
import './index.css';

const render = () => {
  ReactDOM.render(<BaseRouter />, document.getElementById('root'));
};

render();



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

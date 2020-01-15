import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store.js';

// setup fake backend
// import { configureFakeBackend } from './helpers';
// configureFakeBackend();

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
<App />
</BrowserRouter>
</Provider>,document.getElementById('root'));
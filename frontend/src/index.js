import React from 'react';
import ReactDOM from 'react-dom';
import 'tachyons';

import './index.css';
import { App } from 'src/App';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

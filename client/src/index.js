import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reducer from './reducers';
import rootSaga from './sagas';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/argon-design-system-react.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

localStorage.setItem("token", "0");
localStorage.setItem("firstname", "user");
localStorage.setItem("lastname", "demo");
localStorage.setItem("lastlogin", "0");
localStorage.setItem("role", "user");
localStorage.setItem("userid", "1");

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

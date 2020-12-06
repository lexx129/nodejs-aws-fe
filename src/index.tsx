import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'components/App/App';
import {store} from 'store/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    switch (error.response.status){
      case 400: {
        alert(error.response.data?.data);
        break;
      }
      case 403: {
        alert('You are not authorized to access this resource (username or password is incorrect)');
        break;
      }
      case 401: {
        alert('You are not authorized to access this resource (no "Authorization" header)');
        break;
      }
    }
    return Promise.reject(error.response);
  }
);

const token = localStorage.getItem('authorization_token')
console.log('Token is: ', token);
axios.interceptors.request.use(config => {
  if (token) {
    config.headers.get['Authorization'] = token;
  }

  return config;
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

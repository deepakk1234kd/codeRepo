import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    console.log('index.js request interceptor: ', request);
    return request;
}, error => {
    console.log('index.js request interceptor error: ', error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log('index.js response interceptor: ', response);
    return response;
}, error => {
    console.log('index.js response interceptor error: ', error);
    return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from '@/containers/App/App';
import '@/styles/scss/base.scss';

axios.defaults.baseURL = 'https://api-start-vizhnay-io.herokuapp.com/api';

ReactDOM.render(<App />, document.getElementById('app'));

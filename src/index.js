import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from '@/containers/App/App';
import '@/styles/scss/base.scss';

axios.defaults.baseURL = 'http://localhost:3000/api';

ReactDOM.render(<App />, document.getElementById('app'));

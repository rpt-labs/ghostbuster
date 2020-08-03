import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

require('./styles.css');

ReactDOM.render(<App />, document.getElementById('app'));

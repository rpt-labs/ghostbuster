import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AlternateApp from './components/AlternateApp';

require('./styles.css');

ReactDOM.render(<AlternateApp />, document.getElementById('app'));

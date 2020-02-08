import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import AlternateAppWithoutAuth from './components/AlternateAppWithoutAuth';

require('./styles.css');

ReactDOM.render(<AlternateAppWithoutAuth />, document.getElementById('app'));

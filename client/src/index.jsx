import '@babel/polyfill';
import ReactDOM from 'react-dom';
// import App from './components/App';
import App from './components/AppWithoutAuth';

require('./styles.css');

ReactDOM.render(<App />, document.getElementById('app'));

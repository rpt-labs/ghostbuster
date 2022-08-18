import '@babel/polyfill';
import { createRoot } from 'react-dom/client';
import App from './components/App';

require('./styles.css');

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

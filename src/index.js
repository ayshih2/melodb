import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Search from './Components/Search/Search';
import Compare from './Components/Compare/Compare';

ReactDOM.render(<Compare />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

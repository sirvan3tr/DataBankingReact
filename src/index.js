/*
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
*/

/*
import ReactDOM from 'react-dom'
import React from 'react'
import Contact from './Contact'

// You can choose your kind of history here (e.g. browserHistory)
import { Router, hashHistory as history } from 'react-router';
// Your routes.js file
import routes from './routes';

ReactDOM.render(
  <Router routes={routes} history={history} />,
  //<Contact />,
  document.getElementById('root')
);
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'


ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
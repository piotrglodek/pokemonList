import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// Providers
import Providers from './Providers';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';

// React app ko root div par mount karte hain.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode development me potential issues highlight karta hai.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

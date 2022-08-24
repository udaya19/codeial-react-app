import React from 'react';
import ReactDOM from 'react-dom/client';
// import './styles/index.css';
import './styles/index.css'
import { ToastProvider } from 'react-toast-notifications';
import {App} from './components';
import {BrowserRouter} from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ToastProvider autoDismiss autoDismissTimeout={5000} placement='top-left'>
          <App />
        </ToastProvider>
      </BrowserRouter>
  </React.StrictMode>
);

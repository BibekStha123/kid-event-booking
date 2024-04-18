import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from './ContextProvider.jsx'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <ToastContainer position="top-center" />
      <App />
    </ContextProvider>
  </React.StrictMode>
)

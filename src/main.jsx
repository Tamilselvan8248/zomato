import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import { CartProvider } from './contexts/CartContext';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>  {/* Wrap your App with CartProvider */}
      <App />
      <ToastContainer position="top-right" autoClose={3000} />  {/* Snackbar container */}
    </CartProvider>
  </StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <div
      style={{
        backgroundColor: '#f0f0f0', // Grey background for the entire page
        minHeight: '100vh',          // Make sure the page covers the full height of the viewport
        display: 'flex',             // Use flexbox for centering
        justifyContent: 'center',   // Center horizontally
        alignItems: 'center',       // Center vertically
      }}
    >
    <App />
    </div>
  </React.StrictMode>
);

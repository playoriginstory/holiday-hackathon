import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app';

// React 18+ uses `createRoot` for rendering
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

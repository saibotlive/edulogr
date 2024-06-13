// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css'; // TailwindCSS import

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot container should not be null.

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

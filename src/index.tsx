import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ConversionRateDisplay from './ConversionDisplay'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConversionRateDisplay />
  </React.StrictMode>
);

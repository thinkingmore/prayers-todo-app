import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TaskProvider } from './TaskContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TaskProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TaskProvider>,
)

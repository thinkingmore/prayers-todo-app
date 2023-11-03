import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TaskProvider } from './TaskContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <TaskProvider>
        <App />
    </TaskProvider>
)

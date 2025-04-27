import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import './assets/css/orderBar.css'
import './assets/css/animations/loadingScreen.css';
import App from './App.jsx'

const isDevelopment = import.meta.env.MODE === 'development';

createRoot(document.getElementById('root')).render(
    isDevelopment ? (
        <StrictMode>
            <App />
        </StrictMode>
    ) : (
        <App />
    )
);

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (import.meta.env.VITE_APP_NODE_DEV === 'production') {
   disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <Toaster position="bottom-left" />
         <App />
      </BrowserRouter>
   </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from "react-cookie";
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
)

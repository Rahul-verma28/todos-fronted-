import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

export const server = "https://nodeapi-todos.onrender.com/api/v1"

export const Context = createContext({ isAuthenticated: false })

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState({});
  
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading, setloading,
        user, setuser
      }} >
      <App />
    </Context.Provider >
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)

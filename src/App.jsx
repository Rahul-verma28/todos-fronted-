import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Context, server } from './main';

const App = () => {

  const {setuser, setIsAuthenticated, setloading}= useContext(Context);

  useEffect(() => {
    setloading(true)
    axios.get(`${server}/users/me`, {
      withCredentials: true
    }).then((res) => {
      console.log(res.data.user);
      setuser(res.data.user);
      setIsAuthenticated(true);
      setloading(false)
    }).catch((err) => {
      console.log(err);
      setuser({})
      setIsAuthenticated(false)
      setloading(false)
    })
  },[])

  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
      <Toaster/>
    </Router>
  );
};

export default App;

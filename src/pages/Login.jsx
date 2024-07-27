import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loader from '../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setloading } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true)

        try{
            const {data} = await axios.post(`${server}/users/login`, {
                email, password
            },{
                headers:{
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            toast.success(data.message);
            setIsAuthenticated(true);
            setloading(false);
          }
          catch(error){
            toast.error(error.response.data.message)
            setIsAuthenticated(false);
            console.log(error.response.data.message)
            setloading(false);
        }
    };

    if(isAuthenticated) return <Navigate to={"/"}/>


  return (
    loading? <Loader/>:
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full p-2 mb-2 border rounded-lg focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 mb-2 border rounded-lg focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Login
        </button>
        <p className="text-gray-500 text-sm text-center pt-4">Don't have an account? <Link to="/register" className='text-blue-500 hover:underline'>Register now.</Link></p>
      </form>
    </div>
  );
};

export default Login;

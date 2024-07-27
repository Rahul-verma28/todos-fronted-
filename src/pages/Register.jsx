import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setloading } = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        // console.log(name, email, password);

        try {
            const { data } = await axios.post(`${server}/users/new`, {
                name, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            toast.success(data.message);
            setIsAuthenticated(true);
            setloading(false);
        }
        catch (error) {
            toast.error(error.response.data.message)
            setIsAuthenticated(false);
            setloading(false);
        }
    };

    if (isAuthenticated) return <Navigate to={"/"} />

    return (
        loading ? <Loader /> :
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full p-2 mb-2 border rounded-lg focus:outline-none"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                        Register
                    </button>
                    <p className="text-gray-500 text-sm text-center pt-4">Already have an account? <Link to="/login" className='text-blue-500 hover:underline'>Login now.</Link></p>
                </form>
            </div>

    );
};

export default Register;

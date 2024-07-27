import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

const Header = () => {

    const { isAuthenticated, setIsAuthenticated, setloading, setuser } = useContext(Context);
    console.log(isAuthenticated);

    const HandleLogoout= ()=>{
        try{
            setloading(true);
            axios.get(`${server}/users/logout`,{
                withCredentials: true
            })
            
            toast.success("Logout Sucessfully");
            setIsAuthenticated(false);
            setuser({})
            setloading(false);
        }
        catch(error){
            toast.error("Something went wrong")
            // toast.error(error.response.data.message)
            setIsAuthenticated(true);
            console.log(error)
            setloading(false);
        }
    }
    return (
        <header className="bg-blue-500 text-white p-4">
            <nav className="flex justify-between">
                <div className="text-xl font-bold">Todo App</div>
                <div>
                    <Link to="/" className="mr-4">Home</Link>
                    <Link to="/profile" className="mr-4">Profile</Link>
                    {isAuthenticated?
                    <button className='' onClick={HandleLogoout}>Logout</button>
                    : 
                    <Link to="/login" className="mr-4">Login</Link>
                    }
                </div>
            </nav>
        </header>
    );
};

export default Header;

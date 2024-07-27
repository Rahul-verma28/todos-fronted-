import React, { useContext } from 'react';
import { Context } from '../main';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, loading, isAuthenticated } = useContext(Context);

  if(!isAuthenticated) {
    toast.error("You Need To Login First");
    return <Navigate to={"/login"}/>
  }
  return (
    loading ? <Loader /> :
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
  );
};

export default Profile;

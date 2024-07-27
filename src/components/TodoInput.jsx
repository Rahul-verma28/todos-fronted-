import axios from 'axios';
import React, { useState } from 'react';
import { server } from '../main';
import toast from 'react-hot-toast';
import Loader from './Loader';

const TodoInput = ({ refresh, setrefresh}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loaing, setloaing] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setloaing(true);
    try {
      const {data} = await axios.post(`${server}/task/new`, {
        title, description
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      })
      toast.success(data.message);
      setloaing(false);
      setTitle('')
      setDescription('')
      setrefresh(!refresh)
    } catch (error) {
      toast.error(error.response.data.message);
      setloaing(false);
    }
  }

  return (
    loaing? <Loader/>:
    <form className="mb-4" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Add Todos</h1>
      <input
        type="text"
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        className="w-full p-2 mb-2 border rounded-lg focus:outline-none"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg w-full"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoInput;

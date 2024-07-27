import React, { useEffect, useState } from 'react';
import TodoInput from '../components/TodoInput';
import TodoCard from '../components/TodoCard';
import axios from 'axios';
import { server } from '../main';
import toast from 'react-hot-toast';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [refresh, setrefresh] = useState([]);

  const toggleTodo = async (id) => {
    try {
      const {data}= await axios.put(`${server}/task/${id}`,
        {},
        {
          withCredentials: true
        }
      );
      toast.success(data.message)
      setrefresh(!refresh);
    } catch (error) {
  
      toast.success(error.response.data.message)
    }
  }

  const removeTodo = async (id) => {
    try {
      const {data}= await axios.delete(`${server}/task/${id}`,
        {
          withCredentials: true
        }
      );
      toast.success(data.message)
      setrefresh(!refresh);

    } catch (error) {
      toast.success(error.response.data.message)
    }
  }

  useEffect(() => {
    axios.get(`${server}/task/my`, {
      withCredentials: true
    }).then((res) => {
      setTodos(res.data.tasks)
      console.log(res.data.tasks)
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message)
    })

  }, [refresh])


  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <TodoInput refresh={refresh} setrefresh={setrefresh} />

      <ul>
        {todos.map((todo) => (
          <TodoCard
            id={todo._id}
            key={todo._id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
          // <li>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

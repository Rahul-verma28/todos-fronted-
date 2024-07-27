import React from 'react';

const TodoCard = ({todo, toggleTodo, removeTodo,id }) => {
  return (
    <div className={`flex justify-between items-center p-4 bg-white shadow-md rounded-lg mb-2 ${todo.completed ? 'line-through text-gray-400' : ''}`}>
      <div className="flex items-center">
        <input 
          type="checkbox" 
          className="mr-2"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(id)}
        />
        <div>
          <h3 className="text-lg font-semibold">{todo.title}</h3>
          <p className="text-gray-600">{todo.description}</p>
        </div>
      </div>
      <button 
        className="bg-red-500 text-white p-1 rounded-md"
        onClick={() => removeTodo(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default TodoCard;

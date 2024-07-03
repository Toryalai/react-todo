import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoList from './TodoList'; 
import AddTodoForm from './AddTodoForm'; 

function App() {
  const [newTodo, setNewTodo] = useState('');

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={setNewTodo} /> 
      <p>{newTodo}</p> 
      <TodoList /> 
    </div>
  );
}

export default App;

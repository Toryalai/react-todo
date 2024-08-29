import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));

      setTodos(todos);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data from Airtable:', error.message);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <BrowserRouter> 
      <Routes> 
        
        <Route path="/" element={
          <div>
            <h1>Todo List</h1>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <AddTodoForm onAddTodo={handleAddTodo} />
                <TodoList todos={todos} onRemoveTodo={removeTodo} />
              </>
            )}
          </div>
        } />
        
        {}
        <Route path="/new" element={
          <div>
            <h1>New Todo List</h1> 
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); 

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}?view=Grid%20view`;

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Map and sort todos based on current sort order
      const sortedTodos = data.records
        .map((record) => ({
          id: record.id,
          title: record.fields.title,
          createdTime: record.createdTime, // Assuming this is the field name for created time
        }))
        .sort((objectA, objectB) => {
          const titleA = objectA.title.toLowerCase();
          const titleB = objectB.title.toLowerCase();

          // Sort based on the current sort order
          return sortOrder === 'asc'
            ? (titleA < titleB ? -1 : titleA > titleB ? 1 : 0)
            : (titleA < titleB ? 1 : titleA > titleB ? -1 : 0);
        });

      setTodos(sortedTodos);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data from Airtable:', error.message);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [sortOrder]); // Fetch data again when sortOrder changes

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoading]);

  const handleAddTodo = (newTodo) => {
    // Automatically sort the new todos when added
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];

      return updatedTodos.sort((objectA, objectB) => {
        const titleA = objectA.title.toLowerCase();
        const titleB = objectB.title.toLowerCase();
        
        return sortOrder === 'asc'
          ? (titleA < titleB ? -1 : titleA > titleB ? 1 : 0)
          : (titleA < titleB ? 1 : titleA > titleB ? -1 : 0);
      });
    });
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
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
                <button style={{ margin: '10px' }} onClick={toggleSortOrder}>
                  Toggle Sort Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </button>
                <TodoList todos={todos} onRemoveTodo={removeTodo} />
              </>
            )}
          </div>
        } />
        
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

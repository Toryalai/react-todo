import React, { useState, useEffect } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => {
        const savedTodos = localStorage.getItem('todos');
        const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
        resolve({ data: { todoList: initialTodos } });
      }, 2000); 
    });

    fetchData.then((result) => {
      setTodos(result.data.todoList);
      setIsLoading(false); 
    });
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
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
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
  );
}

export default App;

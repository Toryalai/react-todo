import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);

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
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onRemoveTodo={removeTodo} />
    </div>
  );
}

export default App;

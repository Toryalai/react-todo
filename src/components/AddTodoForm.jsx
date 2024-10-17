import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';


function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now()
    };
    onAddTodo(newTodo);
    setTodoTitle('');
  };

  return (
    <form 
      onSubmit={handleAddTodo} 
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
    >
      <InputWithLabel
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        style={{ flex: 1 }}  
      >
        Title
      </InputWithLabel>
      <button type="submit" style={{ padding: '10px 15px' }}>Add</button>
    </form>
  );
  
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired, 
};

export default AddTodoForm;

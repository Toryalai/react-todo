import React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

function TodoList({ todos, onRemoveTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,   
      title: PropTypes.string.isRequired, 
      completed: PropTypes.bool,         
    })
  ).isRequired,                    
  onRemoveTodo: PropTypes.func.isRequired, 
};

export default TodoList;

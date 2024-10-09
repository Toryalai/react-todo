import React from 'react';
import styles from './TodoListItem.module.css';
import PropTypes from 'prop-types';

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={styles.ListItem}>
      {todo.title}
      <button type="button" onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,      
    title: PropTypes.string.isRequired,  
    completed: PropTypes.bool,         
  }).isRequired,                      
  onRemoveTodo: PropTypes.func.isRequired, 
};

export default TodoListItem;

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoList = [
  { id: 1, title: "Complete assignment 1" },
  { id: 2, title: "Complete assignment 2" },
  { id: 3, title: "Complete assignment 3" }
];

function App() {

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function(item){
          return <li key={item.id}>{item.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App

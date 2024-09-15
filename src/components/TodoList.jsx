import React, { useEffect, useState } from 'react';
import Todo from './Todo';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      fetch('https://dummyjson.com/todos')
        .then((res) => res.json())
        .then((data) => setTodos(data.todos));
    })();
  }, []);

  return (
    <ul>
      {todos.map((t) => (
        <Todo data={t}/>
      ))}
    </ul>
  );
}

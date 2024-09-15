import React, { useEffect, useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      fetch('https://dummyjson.com/todos')
        .then((res) => res.json())
        .then((data) => setTodos(data));
    })();
  }, []);

  console.log(todos);
  return <div>TodoList</div>;
}

import React from 'react';

export default function Todo({ data }) {
  return(
    <li key={data.id}>
        {data.todo}
    </li>
  );
}

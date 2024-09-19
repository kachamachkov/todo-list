import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';

export default function TodoList() {
  const todosQuery = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  console.log(todosQuery.data);

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <h1>Todo List</h1>
      {todosQuery.isFetching ? (
        <div>Loading Todos</div>
      ) : (
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {todosQuery.data.map((todo) => {
            const labelId = `checkbox-list-label-${todo.id}`;

            return (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton edge='end' aria-label='comments'>
                    <CommentIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(todo.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge='start'
                      checked={checked.indexOf(todo.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={todo.todo} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
}

async function getTodos() {
  const response = await fetch('https://dummyjson.com/todos');
  const result = await response.json();

  return result.todos;
}

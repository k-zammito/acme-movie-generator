import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { connect, useDispatch } from 'react-redux';
import { addMovie } from './store';

function MovieButton() {
  const dispatch = useDispatch();
  const add = () => dispatch(addMovie());
  return (
    <Stack spacing={2} direction="row">
      <Button color="secondary" variant="contained" onClick={() => add()}>
        Add Movie
      </Button>
    </Stack>
  );
}

export default connect(null, null)(MovieButton);

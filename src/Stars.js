import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

function Stars(props) {
  const { movie } = props;
  //   console.log('FROM STARS --->', movie.rating);
  const [value, setValue] = React.useState(movie.rating);
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating name="read-only" value={value} readOnly />
    </Box>
  );
}

export default Stars;

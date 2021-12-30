import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function Stars() {
  const [value, setValue] = React.useState(3);
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rating</Typography>
      <Rating name="read-only" value={value} readOnly />
      {/* <Typography component="legend">Rating</Typography>
      <Rating
        name="size-small"
        size="small"
        value={value}
        onChange={(event, newValue) => {
          if (newValue === NoLuggageOutlined) {
            newValue = 1;
          }
          setValue(newValue);
          console.log(value);
        }}
      /> */}
    </Box>
  );
}

export default Stars;

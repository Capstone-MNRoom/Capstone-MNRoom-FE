import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const BasicRating = (props) => {
  const [value, setValue] = useState(2);

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >{props.controll}</Rating>
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly>{props.read}</Rating>
    </Box>
  );
}

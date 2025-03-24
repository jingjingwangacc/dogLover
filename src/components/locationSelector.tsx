import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export interface ZipCodeProps {
    zipCode: string
    setZip: Function
}
export default function LocationSelector(props:ZipCodeProps) {
  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="zipCode" label="zipCode" variant="outlined" 
      value={props.zipCode}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.setZip(event.target.value);
      }}
      />
    </Box>
  );
}

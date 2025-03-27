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
      sx={{width: '100%' }}
      noValidate
      autoComplete="off"
    >
      <TextField id="zipCode" label="Zip Code" variant="outlined" 
      value={props.zipCode}
      sx={{width: '100%' }}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        props.setZip(event.target.value);
      }}
      />
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export interface SortProps {
    handleSearch: Function
    sort: string
    setSort: Function
}
export default function Sort(props:SortProps) {

  const handleChange = (event: SelectChangeEvent) => {
    props.setSort(event.target.value as string);
    
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.sort}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'breed:asc'}>Breed</MenuItem>
          <MenuItem value={'name:asc'}>Name</MenuItem>
          <MenuItem value={'age:asc'}>Age</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

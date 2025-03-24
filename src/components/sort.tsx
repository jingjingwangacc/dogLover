import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Sort() {
  const [sort, setSort] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Breed</MenuItem>
          <MenuItem value={20}>Name</MenuItem>
          <MenuItem value={30}>Age</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

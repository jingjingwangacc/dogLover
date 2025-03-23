import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


function valuetext(value: number) {
    return `${value}`;
}

export interface AgeProps {
    age: number[]
    setAge: Function
}
export default function AgeSelector(props: AgeProps) {

    const handleChange = (event: Event, newValue: number | number[]) => {
        props.setAge(newValue as number[]);
    };

    return (
        <Box sx={{ width: 300 }}>
            <Typography gutterBottom variant="h5" component="div">
                Age
            </Typography>
            <Slider
                getAriaLabel={() => 'age range'}
                value={props.age}
                min={0}
                max={30}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}



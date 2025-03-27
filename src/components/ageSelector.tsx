import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value: number) {
    return `${value}`;
}

export interface AgeProps {
    age: number[]
    setAge: Function
}
export default function AgeSelector(props: AgeProps) {

    const handleChange = (_event: Event, newValue: number | number[]) => {
        props.setAge(newValue as number[]);
    };

    return (
        <Box sx={{ width: 200, padding: '20px' }}>

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



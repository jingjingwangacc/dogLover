import AgeSelector from '../components/ageSelector'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';


export interface SelctorProps {
    handleSearch:Function
}
export default function Selectors(props: SelctorProps) {
    const [age, setAge] = React.useState<number[]>([0, 15]);

    return (
        <>
        <Box>
            <AgeSelector age={age} setAge={setAge}/>
        </Box>
        <Button variant="contained" onClick={() => {props.handleSearch(age[0], age[1])}}>Search</Button>

        </>
    )
}
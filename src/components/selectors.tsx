import AgeSelector from '../components/ageSelector'
import BreedSelector from '../components/breedSelector'
import LocationSelector from '../components/locationSelector'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import * as React from 'react';


export interface SelctorProps {
    handleSearch:Function
    age: number[]
    setAge: Function
    breeds: string[]
    setBreeds: Function
    zipCode: string
    setZip: Function
}
export default function Selectors(props: SelctorProps) {
    
    return (
        <>
        <Box>
            <BreedSelector breeds={props.breeds} setBreeds={props.setBreeds}/>
        </Box>
        <Box>
            <LocationSelector zipCode={props.zipCode} setZip={props.setZip}/>
        </Box>
        <Box>
            <AgeSelector age={props.age} setAge={props.setAge}/>
        </Box>
        <Button variant="contained" onClick={() => {props.handleSearch()}}>Search</Button>

        </>
    )
}
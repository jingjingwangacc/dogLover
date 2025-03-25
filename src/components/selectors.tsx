import AgeSelector from '../components/ageSelector'
import BreedSelector from '../components/breedSelector'
import LocationSelector from '../components/locationSelector'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";



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
        <Typography gutterBottom fontFamily='"Roboto", sans-serif;' fontWeight='bold' component="div" color='black'>
                BREEDS
        </Typography>
        <Box>
            <BreedSelector breeds={props.breeds} setBreeds={props.setBreeds}/>
        </Box>
        <div style={{height: '50px'}}/>
        <Typography gutterBottom fontFamily='"Roboto", sans-serif;' fontWeight='bold' component="div" color='black'>
                LOCATION
        </Typography>
        <Box>
            <LocationSelector zipCode={props.zipCode} setZip={props.setZip}/>
        </Box>
        <div style={{height: '50px'}}/>
        <Typography gutterBottom fontFamily='"Roboto", sans-serif;' fontWeight='bold' component="div" color='black'>
                AGE
        </Typography>
        <Box>
            <AgeSelector age={props.age} setAge={props.setAge}/>
        </Box>
        <Button variant="contained" onClick={() => {props.handleSearch()}}>Search</Button>

        </>
    )
}
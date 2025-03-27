import AgeSelector from '../components/ageSelector'
import BreedSelector from '../components/breedSelector'
import LocationSelector from '../components/locationSelector'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from "styled-components";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



export interface SelctorProps {
    handleSearch: Function
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
            <Card sx={{ maxWidth: 500, borderRadius: '50px' }}>
                <CardContent sx={{ padding: '50px', paddingBottom: '50px' }}>
                         <Typography variant="h6" fontWeight='bold' color="gray" sx={{paddingBottom: '30px'}}>
                            Find the best match!
                        </Typography>
                    <Typography gutterBottom fontFamily='"Roboto", sans-serif;' fontWeight='bold' component="div" color='black'>
                        BREEDS
                    </Typography>
                    <Box>
                        <BreedSelector breeds={props.breeds} setBreeds={props.setBreeds} />
                    </Box>
                    <div style={{ height: '20px' }} />
                    <Typography gutterBottom fontFamily='"Roboto", sans-serif;' fontWeight='bold' component="div" color='black'>
                        LOCATION
                    </Typography>
                    <Box>
                        <LocationSelector zipCode={props.zipCode} setZip={props.setZip} />
                    </Box>
                    <div style={{ height: '20px' }} />
                    <Typography gutterBottom fontFamily='"Roboto", sans-serif;' fontWeight='bold' component="div" color='black'>
                        AGE
                    </Typography>
                    <Box>
                        <AgeSelector age={props.age} setAge={props.setAge} />
                    </Box>
                    <Button variant="contained" sx={{color: 'white', borderRadius:'20px', width: '100px' }} onClick={() => { props.handleSearch() }}>Search</Button>
                    <div style={{ height: '26px' }} />
                </CardContent>
            </Card>

        </>
    )
}
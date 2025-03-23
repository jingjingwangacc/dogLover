import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import {Dog, DogCard} from '../components/dogCard'
import Selectors from '../components/selectors'

function Search() {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const loadBreed = async() => {
        try {
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const dogSearch = async(ageMin:number, ageMax:number, breeds:string[]) => {
        try {
            let params = new URLSearchParams({
                'sort': 'breed:asc',
                'ageMin': ageMin.toString(),
                'ageMax': ageMax.toString(),
            })
            for (let breed of breeds) {
                params.append('breeds', breed);
            }
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/search?'+params.toString(), {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            getDogs(data.resultIds);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getDogs = async(dogIds: string[]) => {
        try {
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': "*"
                  },
                body: JSON.stringify(dogIds),
                credentials: 'include',
            });
            const data = await res.json();
            setDogs(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {dogSearch(0,15,[])}, [])

    let cards = [];
    for (let i = 0; i < dogs.length; i++) {      
        cards.push(<DogCard {...dogs[i]}/>)
    }

    return (
        <>
        <Box>
            <Selectors handleSearch={dogSearch}/>
        </Box>
        <Box sx={{ minWidth: 275 }}>
            {cards}
        </Box>
        </>
    )

}

export default Search
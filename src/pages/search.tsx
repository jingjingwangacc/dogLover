import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import {Dog, DogCard} from '../components/dogCard'
import Selectors from '../components/selectors'
import Sort from '../components/sort'
import Button from '@mui/material/Button';


function Search() {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [age, setAge] = useState<number[]>([0, 15]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [zipCode, setZip] = useState<string>('');
    const [sort, setSort] = useState<string>('breed:asc');
    const [likedDogs, setLikedDogs] = useState<string[]>([]);
    // const loadBreed = async() => {
    //     try {
    //         const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
    //             method: 'GET',
    //             credentials: 'include',
    //         });
    //         const data = await res.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    const dogSearch = async() => {
        try {
            let params = new URLSearchParams({
                'sort': sort,
                'ageMin': age[0].toString(),
                'ageMax': age[1].toString(),
            })
            for (let breed of breeds) {
                params.append('breeds', breed);
            }
            if(zipCode.length > 0) {
                params.append('zipCodes', zipCode);
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

    const matchDog = async() => {
        try {
            console.log('liked dog', likedDogs);
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': "*"
                  },
                body: JSON.stringify(likedDogs),
                credentials: 'include',
            });
            const data = await res.json();
            console.log('match dog:', data);
            navigate('/match/' + data.match);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {dogSearch()}, [sort])

    let cards = [];
    for (let i = 0; i < dogs.length; i++) {     
        let prop = {...dogs[i]};
        prop.likedDogs = likedDogs;
        prop.setLikedDogs = setLikedDogs 
        cards.push(<DogCard {...prop}/>)
    }

    return (
        <>
        <Button variant="contained" onClick={matchDog}>Match my dog!</Button>
        <Box>
            <Selectors handleSearch={dogSearch} age={age} setAge={setAge} breeds={breeds} setBreeds={setBreeds} zipCode={zipCode} setZip={setZip}/>
        </Box>
        <Box>
            <Sort handleSearch={dogSearch} sort={sort} setSort={setSort}/>
        </Box>
        <Box sx={{ minWidth: 275 }}>
            {cards}
        </Box>
        
        </>
    )

}

export default Search
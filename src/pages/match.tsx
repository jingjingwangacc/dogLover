import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import {Dog, DogCard} from '../components/dogCard'

export interface MatchProps{
    id: string
}
export default function Match(props:MatchProps) {
    let id = props.id;
    console.log('match dog id', id);
    const [matchDog, setMatchDog] = useState<Dog[]>([]);

    const getDog = async() => {
        try {
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': "*"
                  },
                body: JSON.stringify([id]),
                credentials: 'include',
            });
            const data = await res.json();
            setMatchDog(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {getDog()}, [])

    let card = [];
    if (matchDog.length === 1) {
        let prop = {...matchDog[0]};
        prop.likedDogs = [];
        prop.setLikedDogs = null; 
        card.push(<DogCard {...prop}/>)
    }
    

    return (
        <>
        <Box sx={{ minWidth: 275 }}>
            {card}
        </Box>
        
        </>
    )

}
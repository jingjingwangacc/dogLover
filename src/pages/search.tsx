import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { Dog, DogCard } from '../components/dogCard'
import Selectors from '../components/selectors'
import Sort from '../components/sort'
import Button from '@mui/material/Button';
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Match from './match'

const PageContainer = styled.div`
display: flex;
padding: 50px;
background-color:rgba(236, 236, 236, 0.3);
width: 100vw;
box-sizing: border-box;
`;

const MainContainer = styled.div`
display:flex;
flex-direction: row;
width: 100%;
`;

const ResultContainer = styled.div`
display:flex;
flex-direction: column;
width: 70%

`;
const SortContainer = styled.div`
display:flex;
flex-direction: row;
justify-content: space-between;
height: 100px;
width: 100%;
margin-bottom: 50px;
align-items: center;

`;
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function Search() {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [age, setAge] = useState<number[]>([0, 15]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [zipCode, setZip] = useState<string>('');
    const [sort, setSort] = useState<string>('breed:asc');
    const [likedDogs, setLikedDogs] = useState<string[]>([]);
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dogSearch = async () => {
        try {
            let params = new URLSearchParams({
                'sort': sort,
                'ageMin': age[0].toString(),
                'ageMax': age[1].toString(),
            })
            for (let breed of breeds) {
                params.append('breeds', breed);
            }
            if (zipCode.length > 0) {
                params.append('zipCodes', zipCode);
            }

            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/search?' + params.toString(), {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            getDogs(data.resultIds);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getDogs = async (dogIds: string[]) => {
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

    const matchDog = async () => {
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
            // navigate('/match/' + data.match);
            handleOpen();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => { dogSearch() }, [sort])

    let cards = [];
    for (let i = 0; i < dogs.length; i++) {
        let prop = { ...dogs[i] };
        prop.likedDogs = likedDogs;
        prop.setLikedDogs = setLikedDogs
        cards.push(
            <Grid item xs={3}>
                <DogCard {...prop} />
            </Grid>
        )
    }




    return (
        <>
            <PageContainer>
                <MainContainer>
                    <Box sx={{ width: '30%', paddingRight: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Selectors handleSearch={dogSearch} age={age} setAge={setAge} breeds={breeds} setBreeds={setBreeds} zipCode={zipCode} setZip={setZip} />
                    </Box>
                    <ResultContainer>
                        <SortContainer>
                            <Box></Box>
                            <Button variant="contained" sx={{ height: '60px', width: '200px', borderRadius: '30px', color: 'white' }} onClick={matchDog}>Match my dog!</Button>
                            <Box>
                                <Sort handleSearch={dogSearch} sort={sort} setSort={setSort} />
                            </Box>
                        </SortContainer>
                        <Box sx={{ minWidth: 275 }}>
                            <Grid container spacing={2}>
                                {cards}
                            </Grid>
                        </Box>
                    </ResultContainer>
                </MainContainer>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </PageContainer>

        </>
    )

}

export default Search
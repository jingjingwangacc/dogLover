import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import { Dog, DogCard } from '../components/dogCard'
import Selectors from '../components/selectors'
import Sort from '../components/sort'
import Button from '@mui/material/Button';
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import NavBar from '../components/navBar';
import matchLogo from '../assets/matchLogo.webp'
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PageContainer = styled.div`
display: flex;
background-color:rgba(236, 236, 236, 0.3);
width: 100vw;
box-sizing: border-box;
flex-direction: column;
`;

const MainContainer = styled.div`
display:flex;
flex-direction: row;
width: 100%;
padding: 50px;
box-sizing: border-box;
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
margin-bottom: 20px;
align-items: center;

`;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '10%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

function Search() {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [age, setAge] = useState<number[]>([0, 15]);
    const [breeds, setBreeds] = useState<string[]>([]);
    const [zipCode, setZip] = useState<string>('');
    const [sort, setSort] = useState<string>('breed:asc');
    const [from, setFrom] = useState<number>(0);
    const [size, _setSize] = useState<number>(12);
    const [likedDogs, setLikedDogs] = useState<string[]>([]);
    const [matchedDog, setMatchedDog] = useState<Dog[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); setLikedDogs([]);};

    const dogSearch = async () => {
        try {
            let params = new URLSearchParams({
                'sort': sort,
                'ageMin': age[0].toString(),
                'ageMax': age[1].toString(),
                'from': from.toString(),
                'size': size.toString(),
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
            getMatchDog(data.match);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getMatchDog = async (id: string) => {
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
            data[0].likedDogs = [];
            data[0].setLikedDogs = null;
            setMatchedDog(data);
            handleOpen();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => { dogSearch() }, [sort, from])

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
                <NavBar />
                <MainContainer>
                    <Box sx={{ width: '30%', paddingRight: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: '20px' }}>
                            <ArrowBackIosIcon sx={{ color: 'gray', paddingRight: '10px', cursor: 'pointer', "&:hover": { color: "orange" } }} onClick={() => { setFrom(Math.max(from - size, 0)) }} />
                            <ArrowForwardIosIcon sx={{ color: 'gray', cursor: 'pointer', "&:hover": { color: "orange" } }} onClick={() => { setFrom(from + size) }} />
                        </Box>
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
                        <Avatar alt="matchLogo" src={matchLogo} sx={{ width: 100, height: 100 }} />

                        <Typography variant="h4" fontWeight='bold' gutterBottom color="primary" sx={{ paddingTop: '20px' }}>
                            You found me!
                        </Typography>
                        <DogCard {...matchedDog[0]} />
                    </Box>
                </Modal>
            </PageContainer>
        </>
    )

}

export default Search
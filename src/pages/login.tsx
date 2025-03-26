import { useState } from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../App.css'
import styled from "styled-components";
import loginImage from '../assets/login.jpg';
import Typography from '@mui/material/Typography';

const MainContainer = styled.div`
display:flex;
flex-direction: row;
width: 100%;
`;
const LoginImageContainer = styled.div`
width: 50%;
`;

const LoginContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
margin-top: -100px;
height: 100vh;

`;
const TextContainer = styled.div`
display:flex;
flex-direction: column;
align-items: flex-start;
margin-bottom: 50px;
width: 50%;

`;

const LogoContainer = styled.div`
display:flex;
align-items: flex-start;
padding-left: 50px;
height: 100px

`;

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleLogin = () => {
        fetch('https://frontend-take-home-service.fetch.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            credentials: 'include',
            body: JSON.stringify({
                name: name,
                email: email
            })
        }).then(data => {
            console.log('data recieved from local auth: ', data)
            if (data.status == 200) {
                navigate('/search')
            }
            else {
                console.log('incorrect name or email - login')
                alert('Incorrect name or email')
                navigate('/')
            }
        })
            .catch(err => console.log('error:', err))
    }

    return (
        <>
            <MainContainer>
                <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
                    <LogoContainer>
                        <Typography variant="h5" fontWeight='bold' color="primary" gutterBottom sx={{ marginTop: '30px' }}>
                            DogLover
                        </Typography>
                    </LogoContainer>
                    <LoginContainer>
                        <TextContainer>
                            <Typography variant="subtitle1" gutterBottom>
                                Meet your beloved dog
                            </Typography>
                            <Typography variant="h4" fontWeight='bold' gutterBottom>
                                Sign in to DogLover
                            </Typography>
                        </TextContainer>

                        <TextField
                            required
                            id="name"
                            label="name"
                            sx={{ width: '50%', margin: '10px' }}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <TextField
                            required
                            id="email"
                            label="Email"
                            sx={{ width: '50%', margin: '10px' }}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <Button variant="contained" sx={{ width: '50%', margin: '10px', height: '56px' }} onClick={handleLogin}>Login</Button>
                    </LoginContainer>
                </Box>
                <LoginImageContainer>
                    <img src={loginImage} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
                </LoginImageContainer>
            </MainContainer>

        </>
    )

}

export default Login
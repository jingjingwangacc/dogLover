import { useState } from 'react'
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../App.css'

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
              navigate('/login')
            }
          })
            .catch(err => console.log('error:', err))
    }

    return (
        <>
            <TextField
                required
                id="name"
                label="name"
                defaultValue="name"
                onChange={(e) => {setName(e.target.value)}}
            />
            <TextField
                required
                id="email"
                label="Email"
                defaultValue="email"
                onChange={(e) => {setEmail(e.target.value)}}
            />
            <Button variant="contained" onClick={handleLogin}>Login</Button>

        </>
    )

}

export default Login
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import styled from "styled-components";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import sampleAvatar from '../assets/avatar.png';
import Popover from '@mui/material/Popover';

const LogoContainer = styled.div`
display:flex;
align-items: center;
padding-left: 50px;
justify-content: space-between;
height: 70px;
background-color: #ff9800;
padding-right: 50px;

`;
export default function NavBar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            },
            credentials: 'include',
        }).then(_data => {
            navigate('/')
        })
            .catch(err => {
                console.log('error:', err)
                navigate('/')
            })

    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <LogoContainer>
                <Typography variant="h5" fontWeight='bold' color='white'>
                    DogLover
                </Typography>
                <Avatar alt="account1" src={sampleAvatar} sx={{ width: 50, height: 50, cursor: 'pointer' }} onClick={handleClick} />
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Button sx={{ p: 2 }} onClick={handleLogout}>Log Out</Button>
                </Popover>
            </LogoContainer>

        </>
    )
}
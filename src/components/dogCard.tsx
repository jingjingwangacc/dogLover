import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
    likedDogs: string[]
    setLikedDogs: Function | null
}
export function DogCard(props: Dog) {
    
    const favorite = () => {
        if (props.setLikedDogs !== null) {
            for (let i = 0; i < props.likedDogs.length; i++) {
                if (props.likedDogs[i] === props.id) {
                    console.log('found', props.likedDogs[i]);
                    return <FavoriteIcon color='primary' onClick={() => {
                        let newLike = [...props.likedDogs];
                        newLike.splice(i, 1);
                        (props.setLikedDogs as Function)(newLike);
                    }} />
                }
            }
            return (<FavoriteBorderIcon sx={{"&:hover": { color: "orange" } }} onClick={() => {
                let newLike = [...props.likedDogs];
                newLike.push(props.id);
                (props.setLikedDogs as Function)(newLike);
            }} />)
        } else return <></>
    }

    return (
        <Card sx={{ maxWidth: 345, borderRadius: '16px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.img}
                    alt={props.name}
                />
                <CardContent>
                    {favorite()}
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {'age: ' + props.age}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {'location: ' + props.zip_code}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {'breed: ' + props.breed}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}


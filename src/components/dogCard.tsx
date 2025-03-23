import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}
export function DogCard(props: Dog) {

    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={props.img}
              alt={props.name}
            />
            <CardContent>
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


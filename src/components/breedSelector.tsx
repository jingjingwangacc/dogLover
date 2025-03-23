import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export interface BreedsProps {
    breeds: string[]
    setBreeds: Function
}
export default function BreedSelector(props: BreedsProps) {
    const [allBreeds, setAllBreeds] = React.useState<string[]>([]);
    const loadBreed = async () => {
        try {
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            setAllBreeds(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    React.useEffect(() => {loadBreed()}, [])

    return (
        <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={allBreeds}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                filterSelectedOptions
                onChange={(event: any, newValue: string[]) => {
                    props.setBreeds(newValue);
                  }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Breeds"
                        placeholder="Favorites"
                    />
                )}
            />

        </Stack>
    );
}



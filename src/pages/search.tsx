import { useEffect } from 'react'
import reactLogo from '../assets/react.svg'
import '../App.css'

function Search() {
    const loadBreed = async() => {
        try {
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const dogSearch = async() => {
        try {
            const res = await fetch('https://frontend-take-home-service.fetch.com/dogs/search?'+new URLSearchParams({
                'sort': 'breed:asc'
            }).toString(), {
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
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    useEffect(() => {dogSearch()}, [])

    return (
        <>

            <div>

                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    )

}

export default Search
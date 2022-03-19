import React, { useEffect, useState } from 'react';
import Routes from './routes'
import NavBar from './Components/NavBar';
import Card from './Components/Card';
import axios from 'axios'



export default function App() {
    const [personagem, setPersonagem] = useState([])

    const [query, setQuery] = useState('')


    useEffect(() => {
        async function loadContent() {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=1647563057&apikey=c2f121d2b9742e418594ffa5adf6a5f4&hash=857470b5eeb857b42cee22c95615f47d&limit=10`)
                .then(response => {
                    setPersonagem(response.data.data.results)
                    console.log(response.data.data.results)
                }).catch(err => console.log(err))
        }
        loadContent()
       

    }, [query])

    return (
        <div className="App">
            <NavBar search={(q) => setQuery(q)} />
                    {personagem.map((heroeData) => {
                            return (
                                <Card srcImage={`${heroeData.thumbnail.path}.${heroeData.thumbnail.extension}`}
                                    heroeName={heroeData.name} id={heroeData.id} key={heroeData.id}/>
                            )
                        })}
            <Routes />
        </div>
    );
}



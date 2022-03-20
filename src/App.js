import React, { useEffect, useState } from 'react';
import Routes from './routes'
import NavBar from './Components/NavBar';
import Card from './Components/Card';
import axios from 'axios';
import md5 from 'md5';

const publicKey = 'c2f121d2b9742e418594ffa5adf6a5f4'
const privateKey = '4b68c34968ff1590ccbff2014b0b155d89ab4add'

const time = Number(new Date())
const hash = md5(time + privateKey + publicKey)



export default function App() {
    const [personagem, setPersonagem] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        async function loadContent() {
            if( query !== ''){
                const response = await axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&ts=${time}&apikey=${publicKey}&hash=${hash}&limit=10`)
                    setPersonagem(response.data.data.results)
               }
        }
        loadContent()
    }, [query])

    return (
        <div className="App">
            <NavBar search={(q) => setQuery(q)} />
                    {query !== '' ? 
                        <div>
                            {personagem.map((heroeData) => { return (
                                        <Card srcImage={`${heroeData.thumbnail.path}.${heroeData.thumbnail.extension}`}
                                            heroeName={heroeData.name} id={heroeData.id} key={heroeData.id}/>
                                    )
                                })}
                        </div> : null
                    }       
            <Routes />
        </div>
    );
}



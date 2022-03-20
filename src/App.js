import React, { useEffect, useState } from 'react';
import Routes from './routes'
import NavBar from './Components/NavBar';
import axios from 'axios';
import md5 from 'md5';
import { CCardImage ,CCard,CCardBody,CCardTitle,CRow, CCol } from '@coreui/react'

const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY;


const time = Number(new Date())
const hash = md5(time + privateKey + publicKey)



export default function App() {
    const [personagem, setPersonagem] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        async function loadContent() {
            if (query !== '') {
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
                    {personagem.map((item) => {
                        return (

                            <div className="container">
                                <CRow xs={{ cols: 4, gutter: 4 }} md={{ cols: 4 }} className="teste1">
                                    <CCol xs className="teste2">
                                        <CCard className="teste3">
                                            <CCardImage orientation="top" className="card-image-list" src={`${item.thumbnail.path}.${item.thumbnail.extension}`} />
                                            <CCardBody>
                                                <CCardTitle className="text-center text-white">{item.name}</CCardTitle>
                                            </CCardBody>
                                           
                                        </CCard>
                                    </CCol>
                                    </CRow>
                            </div>
                        )
                    })}
                </div> : null
            }
            <Routes />
        </div>
    );
}



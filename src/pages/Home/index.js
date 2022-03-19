import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5'

const publicKey = 'c2f121d2b9742e418594ffa5adf6a5f4'
const privateKey = '4b68c34968ff1590ccbff2014b0b155d89ab4add'

const time = Number(new Date())
const hash = md5(time + privateKey + publicKey)




export default function Home() {
    const [personagem, setPersonagem] = useState([])
    const [page, setPage] = useState(1)

    function handlePage(action) {
        setPage(action === 'back' ? page -1 : page + 1)
    }
   
    useEffect(() => {
        async function loadContent() {
           const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?&ts=${time}&apikey=${publicKey}&hash=${hash}&limit=10`)
           .then(response => {
            setPersonagem(response.data.data.results)
            console.log(response.data.data.results)
        }).catch(err => console.log(err))
        }
        loadContent()

    }, [])

    useEffect(() => {
        async function loadPage() {
           const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?offset=${page}&ts=${time}&apikey=${publicKey}&hash=${hash}&limit=10`)
                .then(response => setPersonagem(response.data.data.results)
                ).catch(err => console.log(err))
        }
        loadPage()

    }, [page])
    return (
        <div>
        <div className="container">
       
            {personagem.map((item) =>  {
                 return (
                    <div className="catalogo" key={item.id}>
                        <img className="article-img"
                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                            alt={item.title} />
                        <a className="article-title">
                            {item.title}
                        </a>
                        

                       
                    </div>
                    
                  
                  
                ) 

            })}
           
        </div> 
        <div className="btn-groupe">
                <button type="button" className="btn" onClick={() => handlePage('back')} disabled={page < 2} >
                    Voltar
                </button>
                <button type="button" className="btn" onClick={() => handlePage('next')}>
                    Proxima pagina
                </button>
            </div>
        </div>
        
        

    )
}

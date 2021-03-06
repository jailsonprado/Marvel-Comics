import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import {Link} from 'react-router-dom';



const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY;

const time = Number(new Date())
const hash = md5(time + privateKey + publicKey)


export default function Home() {
    const [personagem, setPersonagem] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(1)

    function handlePage(action) {
        setPage(action === 'back' ? page - 1 : page + 1)
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        async function loadContent() {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?orderBy=focDate&ts=${time}&apikey=${publicKey}&hash=${hash}&limit=10`)
                    setLoading(0)
                    setPersonagem(response.data.data.results)        
        }
        loadContent()

    }, [])

    useEffect(() => {
        async function loadPage() {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?orderBy=focDate&offset=${page}&ts=${time}&apikey=${publicKey}&hash=${hash}&limit=10`)
                setLoading(0)
                setPersonagem(response.data.data.results)  
        }
        loadPage()

    }, [page])
    return (
        <div>
            <div className="logo">
                <svg width="62" height="28" viewBox="0 0 62 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="58" height="24.0415" fill="#EC111A" />
                    <path d="M3.95312 4.4043V23.6375H7.40908L7.55934 15.0727L9.06193 23.6375H11.0153L12.5179 15.0727V23.6375H19.1293L19.5801 20.7825H22.2847L22.7355 23.6375H29.4972V17.4768H30.2485L31.7511 23.6375H35.207L33.1034 16.425C34.2876 15.2355 34.847 14.4378 35.207 12.2178L37.1604 23.6375H41.3676L44.0723 6.65818V23.6375H50.6837V20.1815H47.5283V15.824H50.6837V12.2178H47.5283V8.01051H50.6837V4.4043H40.9169L39.264 16.7255L37.9117 4.4043H34.0049L34.3055 7.25922C33.7044 5.75663 31.7511 4.4043 30.549 4.4043H25.891V21.2333L23.4868 4.4043H18.6785L16.1241 21.8343V4.4043H11.6163L9.96349 13.8706L8.31064 4.4043H3.95312Z" fill="white" />
                    <path d="M51.2847 23.6375V4.4043H54.7407V20.3318H57.7459V23.6375H51.2847Z" fill="white" />
                    <path d="M21.0831 9.66333L20.0312 17.3265H22.1349L21.0831 9.66333Z" fill="#EC111A" />
                    <path d="M29.4976 13.7203V7.70996C30.8815 8.1469 31.7515 8.91203 31.7515 10.8654C31.7515 12.2177 30.9046 13.53 29.4976 13.7203Z" fill="#EC111A" />
                </svg>
            </div>


            {loading ? <div className="text-center">
                <h3>Loading...</h3>
                <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>  
                </div>
            </div>
                : <div>
                    <div className="container-grid">
                        {personagem.map((item) => {
                            return (
                                <>
                                    <div className="catalogo" key={item.id}>
                                        <img className="article-img"
                                            src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                                            alt={item.title} />
                                        <div className="details">
                                            <Link to={`/comics/${item.id}`} className="btn text-white">Ver detalhes</Link>
                                        </div>
                                        <div className="article-title">{item.title}</div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <div className="btn-groupe">
                        <a className="btn text-white" onClick={() => handlePage('back')} disabled={page < 2} >
                        &#8672; Voltar
                        </a>
                        <a className="btn text-white" onClick={() => handlePage('next')}>
                            Proxima pagina &#8674;
                        </a>
                    </div>
                    <div className="text-center text-danger">P??gina {page} de 5.152 </div>
                </div>
            }
        </div>
    )
}

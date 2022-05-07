import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import md5 from 'md5';
import { CCardImage ,CCard,CCardBody,CCardTitle,CCardText } from '@coreui/react'

const publicKey = process.env.REACT_APP_API_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_API_PRIVATE_KEY;

const time = Number(new Date())
const hash = md5(time + privateKey + publicKey) // Gerando hash

export default function Details() {
    const { id } = useParams();
    const [personage, setPersonage] = useState([])

    useEffect(() => {
        async function loadContent() {
            const response = await axios.get(`http://gateway.marvel.com/v1/public/comics/${id}?&ts=${time}&apikey=${publicKey}&hash=${hash}&limit=10`)
            setPersonage(response.data.data.results)
        }
        loadContent()

    }, [id])

    return (
        <>
            {personage.map((item) =>
                <div className="cards">
                    <Link to="/" className="btn text-white btn-back">&#8672;Home</Link>
                    <CCard className="mb-3 card-image-list">
                    <CCardBody className="card-body">
                            <CCardTitle className="text-white">{item.title}</CCardTitle>
                            <CCardText className="text-white">{item.description ? item.description : 'No data'}</CCardText>
                            <CCardText>
                                <small className="text-medium-emphasis text-white">
                                    Creators: 
                                    { item.creators !== undefined && item.creators.items.length > 0 ? item.creators.items.map(item => ` ${item.name} ` ) : 'No data'}
                                </small>
                            </CCardText>
                        </CCardBody>
                        <CCardImage orientation="top"  src={`${item.thumbnail.path}.${item.thumbnail.extension}`} /> 
                    </CCard>
                </div>
            )}
        </>
    )
}

import React from "react";

const Card = ({ heroeName, srcImage }) => {
    return (

        <>
            <div className="container1">


                <div className="catalogo">
                    <img className="article-img"
                        src={srcImage} alt={`Imagen de ${heroeName}`}
                    />
                    <span className="card-title">{heroeName}</span>



                </div>
            
            </div>
            <hr className="text-dark font-weigth-bold"></hr>
        </>
    );
};

export default Card;
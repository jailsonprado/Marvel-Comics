
import React from "react";

const Card = ({ heroeName, srcImage }) => {
    return (

        <>
            <div class="container1">


                <div className="catalogo">
                    <img className="article-img"
                        src={srcImage} alt={`Imagen de ${heroeName}`}
                    />
                    <span class="card-title">{heroeName}</span>



                </div>
            
            </div>
            <hr className="text-dark font-weigth-bold"></hr>
        </>
    );
};

export default Card;
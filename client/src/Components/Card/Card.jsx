import React from "react";
import './Card_styles.css';
import { Link } from "react-router-dom";

export default function Card({id, nombre, image, continente, poblacion }) {
    return (
        <div className="card">
            <Link to={`/countries/${id}`}>
                <p className="card_title"><b>{nombre}</b></p>
                <img src={image} className="flag" />    
                <p className="card_body"><b>Continent: </b>{continente}</p>
                <p className="card_body">Poblacion: {poblacion}</p>
            </Link>
        </div>
    )
}
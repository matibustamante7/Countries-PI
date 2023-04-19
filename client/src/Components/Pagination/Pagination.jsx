import React from "react";
import { useSelector } from "react-redux";
import './Pagination_styles.css'
export default function Pagination({countriesxPage, paginado}){
    //creo un array para almacenar la cantidad de paginas
    let pages = [];
    //me traigo el array de paises del estado global
    const countries = useSelector((state) => state.countries);
    //recorro el array dividiendo por la cantidad de paises redondeando hacia abajo
    for (let i = 1; i <= Math.ceil(countries.length/countriesxPage); i++) {
        //agrego el indice al array tantas veces se realice la division
        pages.push(i);
    }

    return(
        //mapeo los indices agregados al array pages uno por uno
        <div className="container_pagination">
            {pages.map((page, index) =>{
                return <button key={index} onClick={() => paginado(page)}
                className="btn_number">{page}</button>
            })}
        </div>
    )
}
import React from "react";
import { useSelector } from "react-redux";
import './Pagination_styles.css'
export default function Pagination({countriesxPage, paginado}){
    let pages = [];
    const countries = useSelector((state) => state.countries);

    for (let i = 1; i <= Math.ceil(countries.length/countriesxPage); i++) {
        pages.push(i);
    }

    return(
        <div className="container_pagination">
            {pages.map((page, index) =>{
                return <button key={index} onClick={() => paginado(page)}
                className="btn_number">{page}</button>
            })}
        </div>
    )
}
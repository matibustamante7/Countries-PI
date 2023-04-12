import React, { useState } from "react";
import './SearchBar_styles.css';
import {useDispatch} from "react-redux";
import { getCountryByName } from "../../../redux/actions";

export default function SearchBar() {

    const dispatch = useDispatch()
    
    //creamos el estado local del searchBar para buscar el pais
    const [country, setCountry] = useState('');
    //lo que vaya escribiendo en el input lo voy guardando en el estado local
    
    const handleInputChange = (event) => {
        event.preventDefault();
        //seteamos el estado local con el valor ingresado en el inpu
        setCountry(event.target.value);
        console.log(country);
    }

    //creamos un handle submit para enviar el pais ingresado en la searchBar
    const handleSubmit = (event) => {
        event.preventDefault();
        // aca despachamos la accion con la funcion para traer por nombre y le paso el pais que esta en el estado local, lo que acabamos de escribir
        dispatch(getCountryByName(country));
        setCountry('');  
    }
    return(
        <div className="container_SearchBar">
            <input type='text' placeholder="Search country..."
             onChange={(event)=> handleInputChange(event)}
            className='input_search'/>
            <button className="btn_search" onClick={(event)=>handleSubmit(event)}
            >Search</button>
        </div>
    )
}
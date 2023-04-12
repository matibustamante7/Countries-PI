import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import axios from "axios";
import './CreateActivity_styles.css'
export default function CreateActivity() {

    //me traigo los pasies para colocarlos en el select
    const countries = useSelector((state) => state.countries);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getCountries());
    }, [])
    // console.log(countries);

    //funcion el evento onChange
    function controllerNumber(event) {
        
        //establezco el minimo y maximo de dificultad posible
        const min = 1;
        const max = 5;
        //tomo el valor ingresado en el value a traves del evento
        const value = event.target.value;
        //establezco que el numero no se pase del min ni max
        //por ejemplo si pongo 7 me limita a 5, si pongo 0 a 1
        const newValue = Math.min(Math.max(value, min), max);
        //el value es el newValue
        event.target.value = newValue;
    }

    function handleInputNumber(event) {
        controllerNumber(event);
        handleChange(event);
    }

    const temporadas = ['Summer', "Winter", 'Fall', 'Spring']

    // estado de la nueva actividad
    const [activity, setActivity] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        countries: []
    });

    //crear el handle para enviar y crear la actividad
    function handleChange(event) {
        setActivity({
            ...activity,
            //cada vez que ejecuto la funcion a mi estado activity le
            //agrego el value del input que este modificando
            [event.target.name]: event.target.value
        })
        console.log(activity);
    }

    //funcion para seleccionar el pais o paises
    function handleSelect(event) {
        //al ser dos elementos select se mezclaban al hacer event.target.value, entonces filtre que para que se agreguen en paises no esten incluidos en la season
        if (!temporadas.includes(event.target.value)) {
            setActivity({
                ...activity,
                //le paso una copia de lo que ya habia y o seleccionado, lo que ya habia es un array vacio
                countries: [...activity.countries, event.target.value]
            })
        }
    }

    //funcion para submit
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/activities', activity)
            // .then(res => alert(res.data))
            .catch(err => alert(err))

        //volvemos a setear los inputs en vacio
        setActivity({
            name: '',
            dificultad: '',
            duracion: '',
            temporada: '',
            countries: []
        })
        //history es para que al enviar el form nos lleve de nuevo a la ruta
        history.push('/activities')
    }

    function handleCheck(event) {
        if (event.target.checked) {
            setActivity({
                ...activity,
                temporada: event.target.value
            })
        }
    }


    return (
        <form className="create_Activity" onSubmit={(event) => handleSubmit(event)}>
            <h1>Create yor tourist activity</h1>

            <div className="container_labels">
                <label className="label_input" htmlFor="name"><h2 className="label_input_title">Activity: </h2>
                    <input className="input_text" type="text" name="name"
                        value={activity.nombre} placeholder="Name of the activity..." onChange={(event) => handleChange(event)}></input>
                </label>

                <label className="label_input" htmlFor="dificultad">
                    <h2 className="label_input_title">Difficulty: </h2>
                    <input className="input_text" type="number" name="dificultad" value={activity.dificultad}
                        placeholder="Numbers from 1 to 5..."
                        onChange={(event) => handleInputNumber(event)}
                        ></input>
                </label>

                <label className="label_input" htmlFor="duracion">
                    <h2 className="label_input_title">Duration: </h2> 
                    <input  className="input_text" type="time" name="duracion"
                        value={activity.duracion}
                        onChange={(event) => handleChange(event)}></input>
                </label>
            </div>

            <div className="container_checkboxs">
                <label className="checkbox_text"><input type="checkbox"
                    name="temp"
                    value="Summer"
                    onChange={(event) => handleCheck(event)} /><b>Summer</b></label>

                <label className="checkbox_text"><input type="checkbox"
                    name="temp"
                    value="Winter"
                    onChange={(event) => handleCheck(event)} /><b>Winter</b></label>

                <label className="checkbox_text"><input type="checkbox"
                    name="temp"
                    value="Fall"
                    onChange={(event) => handleCheck(event)} /><b>Fall</b></label>

                <label className="checkbox_text"><input type="checkbox"
                    name="temp"
                    value="Spring"
                    onChange={(event) => handleCheck(event)} /><b>Spring</b></label>

            </div>

            <label htmlFor="countries">
                <select className="countries" name="countries" onChange={(event) => handleSelect(event)}>
                    {/* {mapeo todos los paises en el select} */}
                    {countries.map((country) => (
                        <option key={country.id} value={country.nombre}>
                            {country.nombre}
                        </option>
                    ))}
                </select>
            </label>
            {/* aca podemos ver cada pais seleccionado */}
            <label className="countries_selected">
                <ul className="countries_selected_ul">Country/ies selected:
                    {activity.countries.map(country => (
                        <li className="countries_selected_li">{country}</li>
                    ))}
                </ul>
            </label>
            <button className="btn_submit" type="submit">Create new activity</button>
        </form>

    )
}
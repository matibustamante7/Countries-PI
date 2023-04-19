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

    

    // function handleInputNumber(event) {
    //     handleChange(event);
    // }

    const temporadas = ['Summer', "Winter", 'Fall', 'Spring']

    // estado de la nueva actividad
    const [activity, setActivity] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        paises: []
    });

    //crear el handle para enviar y crear la actividad
    function handleChange(event) {
        validate({...activity, [event.target.name]: event.target.value});
        
            //cada vez que ejecuto la funcion a mi estado activity le
            //agrego el value del input que este modificando
        
        setActivity({
            ...activity,
            [event.target.name]: event.target.value
        })
        // console.log(activity);
    }

    //funcion para seleccionar el pais o paises
    function handleSelect(event) {
        if (temporadas.includes(event.target.value)) {
            setActivity({
              ...activity,
              temporada: event.target.value
            });
          } else {
            setActivity({
              ...activity,
              paises: [...activity.paises, event.target.value]
            });
          }
    }

    //funcion para submit
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/activities', activity)
            .then(res => console.log(res))
            .catch(err => console.log(err))

        //volvemos a setear los inputs en vacio
        setActivity({
            name: '',
            dificultad: '',
            duracion: '',
            temporada: '',
            paises: []
        })
        //history es para que al enviar el form nos lleve de nuevo a la ruta
        history.push('/view-activities')
    }

    function handleCheck(event) {
           
          
        if (event.target.checked) {
            setActivity({
                ...activity,
                temporada: event.target.value
            })
            
        }
    }


    //estado de errores
    const [error, setError] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        countries: []
    })

    //recibo el estado del formulario
    const validate = (activity) => {
        console.log(activity);
        if (activity.name.length < 3) {
          setError({...error, name:'Enter a name with at least 3 characters'})
        } else {
          setError({...error, name:''})
        }
      
        if (!activity.dificultad) {
          setError({...error, dificultad:'Enter a difficulty level'})
        } else {
          setError({...error, dificultad:''})
        }
      
        if (!activity.duracion) {
          setError({...error, duracion:'Enter a duration'})
        } else {
          setError({...error, duracion:''})
        }
      
        if (activity.paises.length === 0) {
          setError({...error, countries:'Select at least one country'})
        } else {
          setError({...error, countries:[]})
        }
      } 

    return (
        <form className="create_Activity" onSubmit={handleSubmit}>
            <h1>Create yor tourist activity</h1>

            <div className="container_labels">
                <label className="label_input" htmlFor="name"><h2 className="label_input_title">Activity: </h2>
                    <input className="input_text" type="text" name="name"
                        value={activity.name} placeholder="Name of the activity..." onChange={(event) => handleChange(event)}></input>
                        {error.name && <p className="text_error">{error.name}</p>}
                </label>

                <label className="label_input" htmlFor="dificultad">
                    <h2 className="label_input_title">Difficulty: (1-5)</h2>
                    <input className="input_text" type="range"
                    min='1' max='5' 
                    name="dificultad" value={activity.dificultad}
                        onChange={(event) => handleChange(event)}
                    ></input>
                </label>

                <label className="label_input" htmlFor="duracion">
                    <h2 className="label_input_title">Duration: </h2>
                    <input className="input_text" type="time" name="duracion"
                        value={activity.duracion}
                        onChange={(event) => handleChange(event)}></input>
                </label>
            </div>

            <div className="container_checkboxs">
                <label className="checkbox_text">
                    <input type="radio"
                    name="temp"
                    value="Summer"
                    onChange={(event) => handleCheck(event)} /><b>Summer</b></label>

                <label className="checkbox_text"><input type="radio"
                    name="temp"
                    value="Winter"
                    onChange={(event) => handleCheck(event)} /><b>Winter</b></label>

                <label className="checkbox_text"><input type="radio"
                    name="temp"
                    value="Fall"
                    onChange={(event) => handleCheck(event)} /><b>Fall</b></label>

                <label className="checkbox_text"><input type="radio"
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
                    {activity.paises.map(pais => (
                        <li className="countries_selected_li" key={pais}>{pais}</li>
                    ))}
                </ul>
            </label>
            <button className="btn_submit" type="submit" >Create new activity</button>
        </form>

    )
}
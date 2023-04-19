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

    const temporadas = ['Summer', "Winter", 'Fall', 'Spring']

    // estado de la nueva actividad
    const [activity, setActivity] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        paises: []
    });
    //estado para errores
    const [errors, setErrors] = useState({
        name: '',
        dificultad: '',
        duracion: '',
        temporada: '',
        paises: ''
    });

    //para validar errores
    function validate(activity) {
        const newErrors = { ...errors };

        if (activity.name.trim().length < 3 || activity.name.trim().length > 255) {
            newErrors.name = 'Activity name must be between 3 and 255 characters';
        } else {
            newErrors.name = '';
        }

        if (!activity.dificultad) {
            newErrors.dificultad = 'Difficulty is required';
        } else {
            newErrors.dificultad = '';
        }

        if (!activity.duracion) {
            newErrors.duracion = 'Duration is required';
        } else {
            newErrors.duracion = '';
        }

        if (!activity.temporada) {
            newErrors.temporada = 'Season is required';
        } else {
            newErrors.temporada = '';
        }

        if (activity.paises.length === 0) {
            newErrors.paises = 'At least one country must be selected';
        } else {
            newErrors.paises = '';
        }

        setErrors(newErrors);
        return Object.keys(errors).length === 0;
    }


    //crear el handle para enviar y crear la actividad
    function handleChange(event) {
        setActivity({
            ...activity,
            [event.target.name]: event.target.value
        });

        validate({ ...activity, [event.target.name]: event.target.value });
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
        validate({ ...activity, [event.target.name]: event.target.value });
    }

    //funcion para submit
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3001/activities', activity)
            .then(res => alert('ok: ' + res.data))
            .catch(err => alert('error: ' + err))

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

        
        validate({ ...activity, [event.target.name]: event.target.value });
        if (event.target.checked) {
            setActivity({
                ...activity,
                temporada: event.target.value
            })

        }
    }
    // useEffect(()=> {
    //     validate()
    // }, [activity])
    return (
        <form className="create_Activity" onSubmit={handleSubmit}>
            <h1>Create yor tourist activity</h1>

            <div className="container_labels">
                <label className="label_input" htmlFor="name"><h2 className="label_input_title">Activity: </h2>
                    <input className="input_text" type="text" name="name"
                        value={activity.name} placeholder="Name of the activity..." onChange={(event) => handleChange(event)}></input>
                </label>
                {errors.name && <p className="text_error">{errors.name}</p>}

                <label className="label_input" htmlFor="dificultad">
                    <h2 className="label_input_title">Difficulty: (1-5)</h2>
                    <input className="input_text" type="range"
                        min='1' max='5'
                        name="dificultad" value={activity.dificultad}
                        onChange={(event) => handleChange(event)}
                    ></input>
                </label>
                {errors.dificultad && <p className="text_error">{errors.dificultad}</p>}
                
                <label className="label_input" htmlFor="duracion">
                    <h2 className="label_input_title">Duration: </h2>
                    <input className="input_text" type="time" name="duracion"
                        value={activity.duracion}
                        onChange={(event) => handleChange(event)}></input>
                </label>
                {errors.duracion && <p className="text_error">{errors.duracion}</p>}
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
            {errors.temporada && <p className="text_error">{errors.temporada}</p>}
            <label htmlFor="countries">
                <select className="countries" name="countries" onChange={(event) => handleSelect(event)}>
                    {/* {mapeo todos los paises en el select} */}
                    {countries.map((country) => (
                        <option key={country.id} value={country.nombre}>
                            {country.nombre}
                        </option>
                    ))}
                </select>
                {errors.paises && <p className="text_error">{errors.paises}</p>}
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
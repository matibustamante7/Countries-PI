import React from "react";
import './Card_Activity_styles.css';
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { deleteActivity } from "../../redux/actions";
export default function Card_Activity({id, name, difficulty, duration, season, countries }) {
    
    const dispatch = useDispatch()
    function handleDelete() {
        dispatch(deleteActivity(id));
        console.log(`eliminar card ${id}`);
    }
    
    return (
        <div className="card">
            <button onClick={handleDelete}>x</button>
                <h3 className="card_title">{name}</h3>
                <p className="card_name">Difficulty: <b>{difficulty}</b></p>
                <p className="card_name">Season: <b>{season}</b></p>
                <p className="card_name">Duration: <b>{duration}  hs</b></p>
                <p className="card_name">Country/ies: <b>{countries}</b></p>
        </div>
    )
}
import React from "react";
import './Card_Activity_styles.css';
import { Link } from "react-router-dom";

export default function Card_Activity({id, name, difficulty, duration, season }) {
    return (
        <div className="card">
            <Link to={`/countries/${id}`}>
                <h3 className="card_title">{name}</h3>
                <p className="card_name">Difficulty: {difficulty}</p>
                <p className="card_name">Season: {season}</p>
                <p className="card_body"><b>Duration: </b>{duration} hs</p>
            </Link>
        </div>
    )
}
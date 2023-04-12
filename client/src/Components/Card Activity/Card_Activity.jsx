import React from "react";
import './Card_Activity_styles.css';
import { Link } from "react-router-dom";

export default function Card_Activity({id, name, difficulty, duration, season, countries }) {
    
    
    return (
        <div className="card">
                <h3 className="card_title">{name}</h3>
                <p className="card_name">Difficulty: <b>{difficulty}</b></p>
                <p className="card_name">Season: <b>{season}</b></p>
                <p className="card_name">Duration: <b>{duration}  hs</b></p>
                <p className="card_name">Country/ies: <b>{countries}</b></p>
        </div>
    )
}
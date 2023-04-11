import React from "react";
import { Link } from "react-router-dom";
import './LandingPage_styles.css'

export default function LandingPage() {
    return (
        <div className="container_LandingPage">
            <div className="container__Content">
                <h1 className="title_LandingPage">Welcome to my proyect of <b>countries</b></h1>
                <Link to='/countries'>
                    <button className="button_Access">Access</button>
                </Link>
            </div>

        </div>
    )
}
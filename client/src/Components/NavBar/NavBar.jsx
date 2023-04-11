import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar";
import './NavBar_styles.css';
export default function NavBar() {
    
    return (
        <div className="container_NavBar">
            <div className="container_Links">
                <Link to='/countries'>HOME</Link>
                <Link to='/activities'>CREATE YOUR ACTIVITY</Link>
                <Link to='/view-activities'>VIEW ACTIVITIES</Link>
            </div>
            <SearchBar />
        </div>
    )
}
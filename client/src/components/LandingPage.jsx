import React from "react";
import {Link} from "react-router-dom";
import "./LandingPage.css";


export default function LandingPage(){

return (
    <div className="landingdiv">
        <div className="landing-container">
            <h1 className="welcomeText">Food App</h1>
            <Link to= "/home">
                <button className="introButton">Enter</button>
            </Link>
        </div>
    </div>
);
};
import React from "react";
import "./Pages.css";


export default function Pages({recipesPerPage, allRecipes, pages}){
    const pageNumber= [];

    for (let i=1;   i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumber.push(i);
    };

    return (
        <div className="pages">
            <ul>
                {pageNumber &&
                pageNumber.map(number=> (
                    
                    <button className= "numberButtons" key= {number} onClick= {()=> pages(number)}> {number} </button>
                    
                ))}
            </ul>
        </div>
    );
};
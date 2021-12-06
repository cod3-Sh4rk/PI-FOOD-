import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterRecipesByDiet, getDiets, getRecipes, filterByOrigin, order} from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card.jsx";
import Pages from "./Pages.jsx";
import SearchBar from "./SearchBar.jsx";
import "./Home.css";



export default function Home(){
    const allRecipes= useSelector((state)=> state.recipes);
    const allDiets= useSelector((state)=> state.diets);
    const dispatch= useDispatch();
    const [_order, setOrder]= useState('');
    const [currentPage, setCurrentPage]= useState(1);
    const [recipesPerPage, setRecipesPerPage]= useState(9);
    const indexOfLastRecipe= currentPage * recipesPerPage;
    const indexOfFirstRecipe= indexOfLastRecipe - recipesPerPage;
    const currentRecipes= allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    
    const pages= (pageNumber)=> {
        setCurrentPage(pageNumber)
    };

    useEffect(()=> {
        dispatch(getDiets());
        },[dispatch]);

    useEffect (()=>{
        dispatch(getRecipes())
    },[dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    };

    function handleFilterDiets(e){
        dispatch(filterRecipesByDiet(e.target.value))
    };

    function handleFilterOrigin(e){
        dispatch(filterByOrigin(e.target.value))
    };

    function handleSort(e){
        e.preventDefault();
        dispatch(order(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered${e.target.value}`)
    };

 /*    function handleSortPrice(e){
        e.preventDefault();
        dispatch(orderByPrice(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered${e.target.value}`)
    }; */

    return(
        <div>
            <div className="homeHeader">
                <h1 className="title">The foodstastic menu</h1>
                <div className="buttons">
                <button className="reloadButton" onClick= {e => {handleClick(e)}}>
                    Reload All Recipes
                </button>
                <Link to= "/create"><button className="createButton">Create Recipe</button></Link>
                </div>
            </div>
            <div>
                <SearchBar className/>
                <div className="filtersOrder">
                    <div className="order">
                        <p>Sorting</p>
                        <select  onChange= {e=> handleSort(e)}>
                            <option value= "asc">A-Z</option>
                            <option value= "desc">Z-A</option>
                            <option value= "high">Low Price</option>
                            <option value= "low">High Price</option>                     
                        </select>
                    </div>
                    <div className="diet">
                        <p>Diet filter</p>
                        <select  onChange= {e=> handleFilterDiets(e)}>
                            <option value= "All">Diets</option>
                            {allDiets?.map((el)=> {
                                return(
                                    <option value= {el.name}> {el.name} </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="origin">
                        <p>Origin Filter</p>
                        <select onChange={e=> handleFilterOrigin(e)}>
                            <option value= "All">All</option>
                            <option value= "Api">Custom</option>
                            <option value= "DataBase">Spoonacular</option>
                        </select>
                    </div>
                    
                </div>
                <div className="cardContainer" >
                
                {currentRecipes?.map((el)=> {
                    return (
                        <div className="cards" >
                            {/* <Link to= {"/home/" + el.id}> */}
                                <Card title= {el.title} /* summary= {el.summary} */ image= {el.image} id= {el.id} price= {el.price}/>
                            {/* </Link> */}
                        </div>
                    );
                    })}
                </div>
                <Pages
                    recipesPerPage= {recipesPerPage}
                    allRecipes= {allRecipes.length}
                    pages= {pages}
                    />
            </div>
        </div>
    );
};
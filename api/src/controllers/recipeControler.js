const { Router } = require('express');
const axios = require ('axios');
const {API_KEY} = process.env 
const {Recipe, Diet} = require('../db');


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=c029fe27f7c44ebcb095c717b7facc2b`);
    const apiInfo = await apiUrl.data.results.map(el=> {
        return {
            title: el.title,
            id: el.id,
            image: el.image,
            summary: el.summary,
            spoonacularScore: el.spoonacularScore,
            healthScore: el.healthScore,
            diets: el.diets,
            price: el.pricePerServing,
            steps: el.analyzedInstructions.map(el=> {return(el.steps.map(el=> { return(el.step)}))}).flat()
        };
      });
      return apiInfo;

    };

    const getDbInfo= async ()=> {
        return await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: [],
                },
            }
        });
    };


    const getAllRecipes= async ()=> {
        const apiInfo = await getApiInfo();
        const dbInfo= await getDbInfo();
        const allInfo= apiInfo.concat(dbInfo);
        return allInfo;
    };
    
    








    module.exports = {
        getAllRecipes,
        getDbInfo,
        
    }
const { Router } = require('express');
const axios = require('axios');
const {Recipe, Diet} = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipe = require('./recipe');
const types = require('./types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', recipe);
router.get('/types', async (_req, res)=> {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=c029fe27f7c44ebcb095c717b7facc2b`);
    const diets= apiUrl.data.results.map(el=> el.diets);
    const innerDiets= diets.flat(2);
    innerDiets.forEach(el=> {
        Diet.findOrCreate({
            where: {name: el}
        })
    })
    const allDiets= await Diet.findAll();
    res.send(allDiets);
});


module.exports = router;

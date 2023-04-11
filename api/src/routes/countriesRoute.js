const { Router } = require('express');

const countriesRouter = Router();
const {getAllCountriesHandler, getCoiuntryById} = require('../handlers/countriesHandler')

countriesRouter.get('/', getAllCountriesHandler)

countriesRouter.get('/:id', getCoiuntryById)

// countriesRouter.get('/countries/name?', getAllCountriesHandler)   

module.exports = countriesRouter; 
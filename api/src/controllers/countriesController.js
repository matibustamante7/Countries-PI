const axios = require('axios');
const {Country} = require('../db');


const getAllCountriesController = async () => {
    //traer todo de la api y gaurdarlo en la db
    const apiCountries =( await axios('https://restcountries.com/v3/all')).data;
    
    const allCountries = apiCountries.map((el) => {
        return{
            id: el.cca3,
            nombre: el.name.common,
            image: el.flags[0],
            continente: el.continents[0],
            capital: el.capital ? el.capital[0] : 'No tiene capital',
            subregion: el.subregion,
            area: el.area,
            poblacion: el.population
        };
    });
    return allCountries;
   
}
const countryByIdController = async (id) => {
    const country = await Country.findByPk(id);
    return country;
}
const searchCountryByNameController = async(name) => {
    const countryByName =  await Country.findAll({where: {nombre:name}});
    return countryByName;
}


module.exports = {
    getAllCountriesController,
    countryByIdController,
    searchCountryByNameController
}
const { searchCountryByNameController, getAllCountriesController, countryByIdController } = require('../controllers/countriesController');

const getCoiuntryById = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const country = await countryByIdController(id);
            res.status(200).json(country);
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

const getAllCountriesHandler = async (req, res) => {
    
    const { name } = req.query;
    console.log(name);
    if (!name) {
        try {
            // name ? await searchCountryByNameController(name) : await getAllCountriesController();
            // const results = await searchCountryByNameController(name);
            const resutls = await getAllCountriesController() 
            res.status(200).json(resutls)
        } catch (error) {
            res.status(400).json({error:error.message})
        }  
    }else{
        
        const results = await searchCountryByNameController(name);
        console.log(results);
        res.status(200).json(results)
    }
    
}

module.exports = {
    getAllCountriesHandler,
    getCoiuntryById
}
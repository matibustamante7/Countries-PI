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
    try {
        const { name } = req.query;
        const resutls = name ? await searchCountryByNameController(name) : await getAllCountriesController();
        
        res.status(200).json(resutls)
    } catch (error) {
        res.status(400).json({error:error.message})
    }  
}

module.exports = {
    getAllCountriesHandler,
    getCoiuntryById
}
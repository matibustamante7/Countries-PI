const { createActivity, getAllActivities} = require('../controllers/activitiesController');



const postActivitiesHandler = async (req, res) => {
    //recibo los datos necesarios para crear una actividad y relacionarla con el pais solicitado
    //la info viene por body
    //crear la actividad en la DB y relacionarla con al menos un pais

    try {
        let { name, dificultad, duracion, temporada , paises} = req.body;
        const newActivity = await createActivity(name, dificultad, duracion, temporada, paises);
        
        res.status(200).json('Nueva actividad creada')
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getAllActivitiesHandler = async (req, res) => {
    try {
        const restults = await getAllActivities();
        res.status(200).json(restults)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getAllActivitiesHandler,
    postActivitiesHandler
}
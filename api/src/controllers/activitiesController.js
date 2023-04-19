const {Activity, Country} = require('../db');

const createActivity = async (name, dificultad, duracion, temporada, paises) =>{
    const newActivity = await Activity.create({name, dificultad, duracion, temporada, paises});
    return newActivity;
}

const getAllActivities = async () => {
    const allActivities = await Activity.findAll({
        include:{
            model: Country,
            attibutes: ['name'],
            through:{
                attibutes: [],
            }
        }
    });
    console.log(allActivities);
    return allActivities;
}

module.exports = {
    createActivity,
    getAllActivities
};
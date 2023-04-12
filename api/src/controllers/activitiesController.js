const {Activity} = require('../db');

const createActivity = async (name, dificultad, duracion, temporada, paises) =>{
    const newActivity = await Activity.create({name, dificultad, duracion, temporada, paises});
    return newActivity;
}

const getAllActivities = async () => {
    const allActivities = await Activity.findAll();
    return allActivities;
}

module.exports = {
    createActivity,
    getAllActivities
};
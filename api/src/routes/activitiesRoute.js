const { Router } = require('express');

const activitiesRouter = Router();
const {getAllActivitiesHandler, postActivitiesHandler} = require('../handlers/activitiesHandler')

activitiesRouter.get('/', getAllActivitiesHandler)

activitiesRouter.post('/', postActivitiesHandler)

activitiesRouter.delete('/', getAllActivitiesHandler)
   
module.exports = activitiesRouter; 
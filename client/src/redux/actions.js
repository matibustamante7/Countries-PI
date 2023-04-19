import axios from 'axios';
import { ORDER_BY_DIFFICULTY, GET_ACTIVITIES, FILTER_BY_CONTINENT, GET_COUNTRIES, ORDER_BY_POPULATION, GET_COUNTRY_NAME, GET_DETAIL_COUNTRY, CREATE_ACTIVITY, ORDER_BY_NAME, DELETE_ACTIVITY } from './actionsType';

export const getCountries = () => {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/countries');
        const countries = json.data;
        dispatch({ type: GET_COUNTRIES, payload: countries })
    }
}
export const getDetailCountry = (id) => {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/countries/${id}`);
        const country = json.data;
        dispatch({ type: GET_DETAIL_COUNTRY, payload: country })
    }
}

export const getCountryByName = (nombre) => {
    // console.log(nombre);
    return async function (dispatch) {
       try {
        let json = await axios('http://localhost:3001/countries?name='+nombre)
        let country = json.data;
        console.log(country);
        dispatch({ type: GET_COUNTRY_NAME, payload: country })
       } catch (error) {
        console.log({error:error.message});
       }
    }
}
export const filterByContinent = (continent) => {
    return {
        type: FILTER_BY_CONTINENT,
        payload: continent
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const deleteActivity = (id) => {
    return{
        type: DELETE_ACTIVITY,
        payload : id
    }
}

export const postActivities = (payload) => {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/activities', payload);
        dispatch({type: CREATE_ACTIVITY, payload})
        return json;
    }
}
export const getActivities = () => {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/activities');
        const activities = json.data;
        dispatch({type: GET_ACTIVITIES, payload: activities})
    }
}
export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}
export const orderByDifficulty = (payload) => {
    return{
        type: ORDER_BY_DIFFICULTY,
        payload
    }
}
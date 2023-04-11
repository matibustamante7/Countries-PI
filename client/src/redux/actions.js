import axios from 'axios';
import { GET_ACTIVITIES, FILTER_BY_CONTINENT, GET_COUNTRIES, ORDER_BY_NAME, GET_COUNTRY_NAME, GET_DETAIL_COUNTRY, CREATE_ACTIVITY } from './actionsType';

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
    return async function (dispatch) {
       try {
        let json = await axios('http://localhost:3001/countries?name='+nombre)
         return dispatch({ type: GET_COUNTRY_NAME, payload: json.data })
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

export const createActivity = (payload) => {
    return{
        type: CREATE_ACTIVITY,
        payload
    }
}

export const postActivities = (payload) => {
    return async function (dispatch) {
        const json = await axios.post('http://localhost:3001/activities', payload);
        return json;
    }
}
export const getActivities = () => {
    return async function (dispatch) {
        const json = await axios.get('http://localhost:3001/activities')
        dispatch({type: GET_ACTIVITIES, payload: json})
    }
}
export const orderByDifficult = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}
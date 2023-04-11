import { FILTER_BY_CONTINENT, ORDER_BY_DIFFICULT, GET_COUNTRIES, ORDER_BY_NAME, GET_COUNTRY_NAME, GET_DETAIL_COUNTRY, CREATE_ACTIVITY, POST_ACTIVITIES, GET_ACTIVITIES } from "./actionsType";

const initialState = {
    countries: [],
    allCountries: [],
    countryDetail: [],
    detailCountry: {},
    activities: [],
};


const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: payload,
                allCountries: payload
            }
        case GET_COUNTRY_NAME:
            return {
                ...state,
                countries: payload
            }
        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            const filterContinent = payload === 'all' ? allCountries : allCountries.filter(el => el.continente === payload);
            return {
                ...state,
                countries: filterContinent
            }
        case GET_DETAIL_COUNTRY:
            return {
                ...state,
                detailCountry: payload
            }
        case ORDER_BY_NAME:
            let sortArr = payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                        return 1;
                    }
                    if (b.nombre > a.nombre) {
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a, b) {
                    if (a.nombre > b.nombre) {
                        return -1;
                    }
                    if (b.nombre > a.nombre) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: sortArr
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                activities: payload
            }
        case POST_ACTIVITIES:
            return {
                ...state,
                activities: payload
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: payload
            }
        case ORDER_BY_DIFFICULT:
            let sortDiff = payload === 'easy' ?
                state.activities.sort(function (a, b) {
                    if (a.dificultad > b.dificultad) {
                        return 1;
                    }
                    if (b.dificultad > a.dificultad) {
                        return -1;
                    }
                    return 0;
                }) :
                state.activities.sort(function (a, b) {
                    if (a.dificultad > b.dificultad) {
                        return -1;
                    }
                    if (b.dificultad > a.dificultad) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                activities: sortDiff
            }
        default:
            return { ...state }
    }
}

export default rootReducer;
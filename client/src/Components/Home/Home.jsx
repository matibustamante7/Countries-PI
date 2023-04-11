import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterByContinent } from "../../redux/actions";
import './Home_styles.css';
import { orderByName } from "../../redux/actions";
import Pagination from "../Pagination/Pagination";


const Home = () => {

    // arreglo del estado con los paises
    const countries = useSelector((state) => state.countries)

    // creo estado locales
    // el primero con la pagina actual
    const [currentPage, setCurrentPage] = useState(1) // 1 porque arranca en la pagina 1
    // el segundo estado es para la cantidad de paises por pagina
    const [countriesxPage, setCountriesxPage] = useState(12);//CAMBIAR A 10 
    // el 10 es porque tengo que mostrar 10 por pagina

    // constante del ultimo pais
    const indexOfLastCountry = currentPage * countriesxPage;

    // indice del primer pais
    const indexOfFistrCountry = indexOfLastCountry - countriesxPage;
    
    // el slice corta un array, en este caso el indice del primer personale y el index del ultimo
    const currentCountries = countries.slice(indexOfFistrCountry, indexOfLastCountry);

    
    //function paginado que recibe el numero de pagina y la funcion setea el numero de pagina
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const dispatch = useDispatch();
    //al montarse el componente hace dispatch
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    //filtro de paises por continente
    function handleFilterContinent(e) {
        //despachamos la action con el evento
        dispatch(filterByContinent(e.target.value))
    }

    //estado para ordenar los paises por nombre
    const [orden, setOrden] = useState('');

    function handleOrderByName (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        //seteamos para que se acomoden en la pagina 1
        setCurrentPage(1);
        setOrden('Ordenado ' + e.target.value )
    }

    return (
        <div className="container_Home">
            <h1>COUNTRIES</h1>
            <select onChange={e => handleFilterContinent(e)} className="select">
                <option value='all'>All continents</option>
                <option value='South America'>South America</option>
                <option value='North America'>North America</option>
                <option value='Europe'>Europe</option>
                <option value='Asia'>Asia</option>
                <option value='Africa'>Africa</option>
                <option value='Oceania'>Oceania</option>
                <option value='Antarctica'>Antartica</option>
            </select>
            <select onChange={e => handleOrderByName(e)} className="select">
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>

            <Pagination
                countriesxPage={countriesxPage}
                // countries={currentCountries.length}
                paginado={paginado}
            />

            <div className="container_cards">

                {currentCountries.map(country => {
                    return (<Card
                        key={country.id}
                        id={country.id}
                        nombre={country.nombre}
                        image={country.image}
                        continente={country.continente}
                        capital={country.capital ? country.capital : 'No tiene capital'}
                        subregion={country.subregion}
                        area={country.area}
                        poblacion={country.poblacion}
                    />)
                })}
            </div>
        </div>
    )
}
export default Home;
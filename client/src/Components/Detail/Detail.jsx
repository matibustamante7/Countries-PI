import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import './Detail_style.css';
import { useEffect } from "react";
import { getDetailCountry } from "../../redux/actions";
const Detail = () => {

    const { idCountry } = useParams();

    const dispatch = useDispatch();

    const countryDetail = useSelector((state) => state.detailCountry)
    // console.log(countryDetail);
    useEffect(() => {
        dispatch(getDetailCountry(idCountry))
    }, [])

    const activities = useSelector((state) => state.activities);
    console.log(activities);
    
    // let actCountry = [];
    // let countries = activities.paises;
    // let country = countryDetail.nombre;

    // activities.forEach((activity) => {
    //     if (countries.indexOf(country)) {
    //         actCountry.push(activity)
    //     }
    // });
    // console.log(actCountry);
    // console.log(actCountry.name);
    return (
        <>
            <div className="card_Detail">
                <div className="data1">
                    <img src={countryDetail.image} alt={`Flag to ${countryDetail.image}`} />
                    <h1>{countryDetail.nombre}</h1>
                    <p>ID: {countryDetail.id}</p>
                </div>

                <div className="data2">
                    <h2>Continent: {countryDetail.continente}</h2>
                    <h3>Capital: {countryDetail.capital}</h3>
                    <h4>Subregion: {countryDetail?.subregion}</h4>
                    <h4>Area: {countryDetail?.area}</h4>
                    <h4>Population: {countryDetail?.poblacion}</h4>
                </div>
            </div>
            {/* <div className="card_Detail">
                    <h2>Tourist activities:</h2>
                    {
                        actCountry.map(act => (
                            <p key={act.id}>{act.name}</p>
                        ))
                    }
                </div> */}
            <Link to={'/countries'}>
                Back
            </Link>
        </>

    )
}
export default Detail;
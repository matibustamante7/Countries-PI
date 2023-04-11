import React, { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../redux/actions";
import Card_Activity from "../Card Activity/Card_Activity";
import { orderByDifficult } from "../../redux/actions";
import './Activities_styles.css'
export default function Activities() {

    const activities = (useSelector((state) => state.activities.data));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActivities());
    }, [])

    //estado para ordenar las actividades por dificultad
    const [orden, setOrden] = useState();

    function handleDifficult (e){
        // e.preventDefault();
        dispatch(orderByDifficult(e.target.value));
        setOrden('Ordenado ' + e.target.value )
    }

    return (
        <div className="primary_container">
            <h1>Actividades</h1>
            <select onChange={e => handleDifficult(e)} className="select">
                <option value="easy">Difficulty: Easier to Harder</option>
                <option value="hard">Difficulty: More difficult to easier</option>
            </select>
            <div className="container_Activities">
                {activities.map(activity => (
                    <Card_Activity
                        key={activity.id}
                        id={activity.id}
                        name={activity.name}
                        difficulty={activity.dificultad}
                        duration={activity.duracion}
                        season={activity.temporada}
                    />
                ))}
            </div>
            {
        console.log(activities)}
        </div>

    )
}
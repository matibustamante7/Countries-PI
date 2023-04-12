import React, { useEffect , useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../../redux/actions";
import Card_Activity from "../Card Activity/Card_Activity";
import { orderByDifficulty } from "../../redux/actions";
import './Activities_styles.css'
export default function Activities() {

    const activities = useSelector((state) => state.activities);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getActivities());
    }, [])

    //estado para ordenar las actividades por dificultad
    const [orden, setOrden] = useState();

    function handleorderByDifficulty(e) {
        dispatch(orderByDifficulty(e.target.value));
        //seteamos el estado local del orden para actualizar
        setOrden('ordenado' + e.target.value)
    }
    
   
    return (
        <div className="primary_container">
            <h1>Activities</h1>
            <select className="select" onChange={e=> handleorderByDifficulty(e)}>
                <option value="easy">Difficulty: 1 to 5</option>
                <option value="hard">Difficulty: 5 to 1</option>
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
                        countries={activity.paises}
                    />
                ))}
            </div>
        </div>

    )
}
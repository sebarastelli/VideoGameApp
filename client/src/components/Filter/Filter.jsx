/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"
import estilos from "./Filter.module.css"
import { dataGames, filterGames, orderGames, ratingGames } from "../../redux/actions"
import { getGameByName } from "../../redux/actions"

export default function Filter({setShowFiltrado,setCurrentPage}){
    const dispatch = useDispatch()

    const handleSearch = () => {
        dispatch(getGameByName(""));
        setCurrentPage(1);
      };

    const handleOrder = (e)=>{
        dispatch(orderGames(e.target.value));
    }

    const handleFilter = (e)=>{
        dispatch(filterGames(e.target.value));
        setCurrentPage(1);
    }

    const handleRating = (e)=>{
        dispatch(ratingGames(e.target.value));
    }

    const handleData = (e) =>{
        dispatch(dataGames(e.target.value));
        setCurrentPage(1);
    }

    return(
        <div className={estilos.filtrado}>
                <h1>Filtrar</h1>
                <select onChange={handleOrder}>
                <option disabled value="0">ORDEN ALFABÉTICO</option>
                    <option value="A">Ascendente</option>
                    <option value="D">Descendente</option>
                </select>
                <select onChange={handleFilter}>
                <option disabled value="0">GENEROS</option>
                    <option value="RPG">RPG</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Indie">Indie</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Sports">Sports</option>
                    <option value="Card">Card</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Family">Family</option>
                    <option value="Action">Action</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Racing">Racing</option>
                    <option value="Educational">Educational</option>
                </select>
                <select onChange={handleData}>
                <option disabled value="0">API/CREATED</option>
                    <option value="API">Api Games</option>
                    <option value="DB">Created Games</option>
                </select>
                <select onChange={handleRating}>
                    <option disabled value="0">RATING</option>
                    <option value="MA">Rating Mayor</option>
                    <option value="ME">Rating Menor</option>
                </select>
                <button className={estilos.boton} onClick={handleSearch}>Resetear Filtros</button>
                <button className={estilos.boton} onClick={()=> setShowFiltrado(false)}>Cerrar</button>
            </div>
    )
}
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Nav from "../Nav/Nav";
import LatNav from "../Latnav/LatNav";
import Card from "../Card/Card";
import estilos from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getGames, getGenres } from "../../redux/actions";
import Filter from "../Filter/Filter";

export default function Home() {
  const [showFiltrado, setShowFiltrado] = useState(false);
  const [loading, setLoading] = useState(true)

  const games = useSelector((state) => state.games);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getGames())
    .then(res=>setLoading(false))
    ;
  }, [dispatch]);

  const gamesPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;

  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(games.length / gamesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(games);
  return (
    <div className={estilos.fondo}>
      <Nav setCurrentPage={setCurrentPage} />
      <LatNav setShowFiltrado={setShowFiltrado} showFiltrado={showFiltrado} />
      {showFiltrado && (
        <Filter
          setShowFiltrado={setShowFiltrado}
          setCurrentPage={setCurrentPage}
        />
      )}
      <div className={estilos.cuerpo}>
       {loading ? (<div className={estilos.gifcarga}><img src="https://i.gifer.com/ZU4S.gif"/><h1>Cargando</h1></div>) :
       games.length === 0 ? <div className={estilos.gifcarga}><img src="https://i.gifer.com/7VE.gif"/><h1>No se encontro el/los videojuegos</h1></div> 
       :  (<div className={estilos.contenedor}>
          {currentGames.map((game) => {
            return (
              <Card
                id={game.id}
                key={game.id}
                name={game.name}
                genres={game.genres}
                image={game.background_image}
                rating={game.rating}
              />
            );
          })}
        </div>)
        }
        <div className={estilos.botones}>
          <button className={estilos.boton} onClick={prevPage}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_,index) => (
            <button
              className={estilos.boton}
              key={index}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button className={estilos.boton} onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

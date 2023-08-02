import { useEffect } from "react";
import estilos from "./Detail.module.css";
import { useParams } from "react-router-dom";
import LatNav from "../Latnav/LatNav";
import Nav from "../Nav/Nav";
import { useSelector, useDispatch } from "react-redux";
import { cleanDetail, getGameDetail } from "../../redux/actions";

export default function Detail() {
  const game = useSelector((state) => state.gameDetail);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getGameDetail(id));
    dispatch(cleanDetail())
  }, [dispatch, id]);

  console.log(game);
  return (
    <>
      <Nav />
      <LatNav />
      <div className={estilos.tarjetaDetalle}>
        <img
          src={game.background_image}
          alt="gameimg"
          className={estilos.imgdetail}
        />
        <h1 className={estilos.h1}> {game.name} </h1>
        <div className={estilos.contenidoDetalle}>
          <h3>
            {" "}
            PLATAFORMAS |{" "}
            {Array.isArray(game.platforms)
              ? game.platforms.join(", ")
              : game.platforms}{" "}
          </h3>
          <h3>
            {" "}
            GENEROS |{" "}
            {Array.isArray(game.genres)
              ? game.genres.join(" - ")
              : game.genres}{" "}
          </h3>
          <h3> RATING | {game.rating} ⭐</h3>
          <h3> FECHA DE LANZAMIENTO | {game.released} </h3>
          <h3>DESCRIPCIÓN: {game.description ? game.description.replace(/<[^>]+>/g, '') : ""} </h3>
        </div>
      </div>
    </>
  );
}

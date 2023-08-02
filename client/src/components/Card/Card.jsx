/* eslint-disable react/prop-types */
import estilos from "./Card.module.css";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function Card({ id, name, image, genres, rating }) {
  return (
    <Link style={{ textDecoration: "none" }} to={`/detail/${id}`}>
      <div className={estilos.contenedor}>
        <div className={estilos.picture}>
          <img className={estilos.imagen} src={image} alt="" />
        </div>
        <div className={estilos.detalles}>
          <h1 className={estilos.nombre}>{name}</h1>
          <h3 className={estilos.generos}> {genres.join(" | ")} </h3>
          <h3 className={estilos.generos}>⭐ {rating}</h3>
        </div>
      </div>
    </Link>
  );
}

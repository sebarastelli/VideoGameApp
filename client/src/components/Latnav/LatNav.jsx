/* eslint-disable react/prop-types */
import estilos from "./LatNav.module.css";
import gamepadsvg from "./gamepad.svg";
import category from "./category.svg";
import aboutsvg from "./about.svg";
import { Link } from "react-router-dom";

export default function LatNav({ setShowFiltrado, showFiltrado }) {
  return (
    <div className={estilos.barra}>
      <div className={estilos.menu}>
        <Link to="/post" className={estilos.link}>
          <button className={estilos.menuicon}>
            <img src={gamepadsvg} alt="img" className={estilos.imagencreate} />
            <h3>Crear</h3>
          </button>
        </Link>
        <button
          className={estilos.menuicon}
          onClick={() => setShowFiltrado(!showFiltrado)}
        >
          <img src={category} alt="img" className={estilos.imagencreate} />
          <h3>Filtrar</h3>
        </button>
        <Link to="/about" className={estilos.link}>
          <button className={estilos.menuicon}>
            <img src={aboutsvg} alt="img" className={estilos.imagencreate} />
            <h3>About</h3>
          </button>
        </Link>
      </div>
    </div>
  );
}
